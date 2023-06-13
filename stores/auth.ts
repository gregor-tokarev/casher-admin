import { defineStore } from "pinia";
import { plainToInstance } from "class-transformer";
import { Tokens } from "~/models/auth.model";
import { AdminUser } from "~/models/admin-user.model";
import { HttpMessage } from "~/models/message.model";

export const useAuthStore = defineStore("auth", {
    state: () => ({
        currentUser: null as AdminUser | null,
    }),
    actions: {
        async addfirst(email: string, password: string): Promise<Tokens> {
            const { $getApi } = useNuxtApp();
            const res = await $getApi().post<Tokens>("/auth/add_first", {
                email,
                password,
            });

            this.setTokens(plainToInstance(Tokens, res.data));

            return plainToInstance(Tokens, res.data);
        },
        async login(email: string, password: string): Promise<Tokens | HttpMessage> {
            const { $getApi } = useNuxtApp();
            const res = await $getApi().post<Tokens | HttpMessage>("/auth/login", {
                email,
                password,
            });

            if ("message" in res.data) {
                return plainToInstance(HttpMessage, res.data);
            }

            this.setTokens(plainToInstance(Tokens, res.data));

            return plainToInstance(Tokens, res.data);
        },
        async fetchCurrent(): Promise<void> {
            if (!this.tokens.accessToken) {
                throw new Error("Access token is not exists");
            }

            const { $getAuthedApi } = useNuxtApp();
            const res = await $getAuthedApi().get<AdminUser>("/auth/current");
            this.currentUser = res.data;
        },
        async refreshAuth(): Promise<Tokens> {
            const { $getApi } = useNuxtApp();
            const res = await $getApi().post<Tokens>("/auth/refresh", { token: this.tokens.refreshToken });
            this.setTokens(res.data);

            return res.data;
        },
        async setPassword(email: string, password: string): Promise<HttpMessage> {
            const { $getApi } = useNuxtApp();
            const res = await $getApi().patch<HttpMessage>(`/auth/set_password`, { password }, { params: { email } });

            return res.data;
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
                accessToken,
                refreshToken,
            });
        },
    },
});
