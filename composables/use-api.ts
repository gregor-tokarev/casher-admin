import axios, { Axios } from "axios";
import { useAuthStore } from "~/stores/auth";

const runtimeConfig = useRuntimeConfig();
let ax: Axios | null = null;

export function useApi(): Axios {
    if (ax) return ax;

    ax = axios.create({
        baseURL: runtimeConfig.public.apiUrl,
    });

    return ax;
}

let authedAx: Axios | null = null;

export function useAuthedApi(): Axios {
    if (authedAx) return authedAx;

    authedAx = axios.create({
        baseURL: runtimeConfig.public.apiUrl,
    });

    authedAx.interceptors.request.use((req) => {
        req.headers.Authorization = `Bearer ${localStorage.getItem("accessToken")}`;

        return req;
    });

    authedAx.interceptors.response.use(
        (res) => res,
        (error) => {
            const status = error.response.status;

            if (status !== 401) return;

            const authStore = useAuthStore();

            return authStore.refreshAuth().then(() => {
                error.config.headers.Authorization = `Bearer ${localStorage.getItem("accessToken")}`;
                return axios.request(error.config);
            });
        }
    );

    return authedAx;
}
