import { defineStore } from "pinia";
import { plainToInstance } from "class-transformer";
import { Tokens } from "~/models/auth.model";

const api = useApi();

export const useAuthStore = defineStore("auth", {
    state: () => ({}),
    actions: {
        async addfirst(email: string, password: string): Promise<Tokens> {
            const res = await api.post<Tokens>("/auth/add_first", {
                email,
                password,
            });

            this.setTokens(plainToInstance(Tokens, res.data));

            return plainToInstance(Tokens, res.data);
        },
        async login(email: string, password: string): Promise<Tokens> {
            const res = await api.post<Tokens>("/auth/login", {
                email,
                password,
            });

            this.setTokens(plainToInstance(Tokens, res.data));

            return plainToInstance(Tokens, res.data);
        },
        setTokens(tokens: Tokens) {
            localStorage.setItem("accessToken", tokens.accessToken);
            localStorage.setItem("refreshToken", tokens.refreshToken);
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
