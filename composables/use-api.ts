import axios, { Axios } from "axios";

let ax: Axios | null = null;

export function useApi(): Axios {
    if (ax) return ax;

    const runtimeConfig = useRuntimeConfig();

    ax = axios.create({
        baseURL: runtimeConfig.public.apiUrl,
    });

    return ax;
}
