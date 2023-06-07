import { defineStore } from "pinia";
import { useNuxtApp } from "#app";
import { AdminPermissions, AdminUser, AllAdminsDto } from "~/models/admin-user.model";

export const useManagerStore = defineStore("manager", {
    state: () => ({
        managers: [] as AdminUser[],
    }),
    actions: {
        async fetchManagers(): Promise<AdminUser[]> {
            const { $getAuthedApi } = useNuxtApp();
            const res = await $getAuthedApi().get<AllAdminsDto>("/auth/");

            this.managers = res.data.admins;

            return res.data.admins;
        },
        async inviteManager(email: string, permissions: AdminPermissions[]): Promise<AdminUser> {
            const { $getAuthedApi } = useNuxtApp();
            const res = await $getAuthedApi().post<AdminUser>("/auth/add_admin", {
                email,
                permissions,
            });

            this.managers.push(res.data);

            return res.data;
        },
        async revokeManager(managerId: string): Promise<void> {
            const { $getAuthedApi } = useNuxtApp();
            await $getAuthedApi().delete(`/auth/remove_admin/${managerId}`);

            const managerIdx = this.managers.findIndex((m) => m.id === managerId);
            this.managers.splice(managerIdx, 1);
        },
        async changePermissions(managerId: string, permissions: string[]): Promise<AdminUser> {
            const { $getAuthedApi } = useNuxtApp();
            const res = await $getAuthedApi().patch<AdminUser>(`/auth/${managerId}/change_permissions`, {
                permissions,
            });

            return res.data;
        },
    },
});
