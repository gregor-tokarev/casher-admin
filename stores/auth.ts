import { defineStore } from "pinia";
import { plainToInstance } from "class-transformer";
import { Tokens } from "~/models/auth.model";

const api = useApi();

export const useAuthStore = defineStore("auth", {
    state: () => ({}),
    actions: {
        async login(email: string, password: string): Promise<Tokens> {
            const res = await api.post<Tokens>("/auth/login", {
                email,
                password,
            });

            this.setTokens(res.data);

            return plainToInstance(Tokens, res.data);
        },
        setTokens(tokens: Tokens) {
            localStorage.setItem("accessToken", tokens.access);
            localStorage.setItem("refreshToken", tokens.refresh);
        },
        clearTokens(): void {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
        },
    },
    getters: {
        tokens(): Tokens {
            const accessToken = localStorage.getItem("accessToken");
            const refreshToken = localStorage.getItem("refreshToken");

            return plainToInstance(Tokens, {
                access: accessToken,
                refresh: refreshToken,
            });
        },
    },
});
