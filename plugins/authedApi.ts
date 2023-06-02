import axios from "axios";
import { useAuthStore } from "~/stores/auth";

export default defineNuxtPlugin(({ $config }) => {
    const authedAx = axios.create({
        baseURL: $config.public.apiUrl,
    });

    authedAx.interceptors.request.use((req) => {
        req.headers.Authorization = `Bearer ${localStorage.getItem("accessToken")}`;

        return req;
    });

    const authStore = useAuthStore();

    authedAx.interceptors.response.use(
        (res) => res,
        (error) => {
            const status = error.response.status;

            if (status !== 401) return;

            return authStore.refreshAuth().then(() => {
                error.config.headers.Authorization = `Bearer ${localStorage.getItem("accessToken")}`;
                return axios.request(error.config);
            });
        }
    );

    return {
        provide: {
            getAuthedApi: () => authedAx,
        },
    };
});
