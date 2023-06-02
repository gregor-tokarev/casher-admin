import axios from "axios";

export default defineNuxtPlugin(({ $config }) => {
    return {
        provide: {
            getApi: () =>
                axios.create({
                    baseURL: $config.public.apiUrl,
                }),
        },
    };
});
