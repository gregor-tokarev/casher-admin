import { defineStore } from "pinia";
import { Category } from "~/models/category.model";

export const useCategoryStore = defineStore("category", {
    state: () => ({
        categories: [] as Category[],
    }),
    actions: {
        async fetchAll(): Promise<Category[]> {
            const { $getAuthedApi } = useNuxtApp();
            const res = await $getAuthedApi().get<Category[]>("/category/all");

            this.categories = res.data;

            return res.data;
        },
    },
});
