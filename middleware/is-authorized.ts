import { useAuthStore } from "~/stores/auth";

export default defineNuxtRouteMiddleware(() => {
    const authStore = useAuthStore();

    if (!authStore.tokens.accessToken) {
        return navigateTo("/");
    }
});
