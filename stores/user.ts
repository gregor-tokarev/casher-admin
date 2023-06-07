import { defineStore } from "pinia";
import { useNuxtApp } from "#app";
import { UserOauthProvider, UsersResponseDto } from "~/models/user.model";

export const useUserStore = defineStore("users", {
    state: () => ({
        usersInfo: null as null | UsersResponseDto,
        authProviders: [] as UserOauthProvider[],
    }),
    actions: {
        async fetchUsers(skip: number, limit: number): Promise<UsersResponseDto> {
            const { $getAuthedApi } = useNuxtApp();
            const res = await $getAuthedApi().get<UsersResponseDto>("/users", { params: { skip, limit } });

            this.usersInfo = res.data;

            return res.data;
        },
        async fetchOauthProfiders(): Promise<UserOauthProvider[]> {
            const { $getAuthedApi } = useNuxtApp();
            const res = await $getAuthedApi().get<UserOauthProvider[]>("/users/oauth");

            this.authProviders = res.data;

            return res.data;
        },
        async enableOption(id: string, credentials: string): Promise<void> {
            const { $getAuthedApi } = useNuxtApp();
            await $getAuthedApi().post(`/users/oauth/${id}/enable`, { credentials });

            const optionIdx = this.authProviders.findIndex((o) => o.id === id);
            this.authProviders.splice(optionIdx, 1, { ...this.authProviders[optionIdx], enabled: false });
        },
        async disableOption(id: string): Promise<void> {
            const { $getAuthedApi } = useNuxtApp();
            await $getAuthedApi().post<UserOauthProvider>(`/users/oauth/${id}/disable`);

            const optionIdx = this.authProviders.findIndex((o) => o.id === id);
            this.authProviders.splice(optionIdx, 1, { ...this.authProviders[optionIdx], enabled: false });
        },
    },
    getters: {
        yandexProvider(state): UserOauthProvider {
            return state.authProviders.find((p) => p.name === "yandex");
        },
        mailruProvider(state): UserOauthProvider {
            return state.authProviders.find((p) => p.name === "mailru");
        },
        vkProvider(state): UserOauthProvider {
            return state.authProviders.find((p) => p.name === "vk");
        },
    },
});
