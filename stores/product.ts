import { defineStore } from "pinia";
import { plainToInstance } from "class-transformer";
import { AdminProductResponseDto, Product } from "~/models/product.model";
import { Review } from "~/models/review.model";

export const useProductStore = defineStore("product", {
    state: () => ({
        productsInfo: null as AdminProductResponseDto | null,
        currentProduct: null as Product | null,
        reviews: [] as Review[],
    }),
    actions: {
        async createProduct(): Promise<Product> {
            const { $getAuthedApi } = useNuxtApp();
            const product = await $getAuthedApi().post<Product>("/product", {});

            this.currentProduct = product.data;

            return product.data;
        },
        async fetchProducts(
            q: string,
            skip: number,
            top: number,
            categories?: string[]
        ): Promise<AdminProductResponseDto> {
            const { $getAuthedApi } = useNuxtApp();
            const products = await $getAuthedApi().get<AdminProductResponseDto>("/product", {
                params: { q, skip, top, categories: categories ?? undefined },
            });

            this.productsInfo = plainToInstance(AdminProductResponseDto, products.data);

            return products.data;
        },
        async fetchDetail(id: string): Promise<Product> {
            const { $getAuthedApi } = useNuxtApp();
            const product = await $getAuthedApi().get<Product>(`/product/${id}`);

            this.currentProduct = product.data;

            return product.data;
        },
        async updateProduct(id: string, product: Partial<Product>): Promise<Product> {
            const { $getAuthedApi } = useNuxtApp();
            const newProduct = await $getAuthedApi().put<Product>(`/product/${id}`, product);

            this.currentProduct = { ...newProduct.data, ...this.currentProduct };

            return newProduct.data;
        },
        async addPhotos(productId: string, files: FileList): Promise<Product> {
            const formData = new FormData();
            for (let i = 0; i < files.length; i++) {
                formData.append("photos", files[i]);
            }

            const { $getAuthedApi } = useNuxtApp();
            const newProduct = await $getAuthedApi().patch<Product>(`/product/${productId}/add_photos`, formData);

            this.currentProduct.photos = newProduct.data.photos;

            return newProduct.data;
        },
        async deletePhotos(productId: string, photoId: string): Promise<Product> {
            const { $getAuthedApi } = useNuxtApp();
            const newProduct = await $getAuthedApi().patch<Product>(`/product/${productId}/delete_photos`, {
                photoIds: [photoId],
            });

            this.currentProduct.photos = newProduct.data.photos;

            return newProduct.data;
        },
        async fetchReviews(productId: string): Promise<Review[]> {
            const { $getAuthedApi } = useNuxtApp();
            const res = await $getAuthedApi().get<Review[]>(`/product/${productId}/reviews`);

            this.reviews = res.data;

            return res.data;
        },
    },
});
