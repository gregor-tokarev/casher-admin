import { defineStore } from "pinia";
import { useNuxtApp } from "#app";
import { OrdersResponseDto, PaymentOption } from "~/models/order.model";
import { UserOauthProvider } from "~/models/user.model";

export const useOrderStore = defineStore("orders", {
    state: () => ({
        ordersInfo: null as null | OrdersResponseDto,
        paymentOptions: [] as PaymentOption[],
    }),
    actions: {
        async fetchOrders(skip: number, take: number): Promise<OrdersResponseDto> {
            const { $getAuthedApi } = useNuxtApp();
            const res = await $getAuthedApi().get<OrdersResponseDto>("/order", { params: { skip, take } });

            this.ordersInfo = res.data;

            return res.data;
        },
        async fetchPaymentOptions(): Promise<PaymentOption[]> {
            const { $getAuthedApi } = useNuxtApp();
            const res = await $getAuthedApi().get<PaymentOption[]>("/payment/option");

            this.paymentOptions = res.data;

            return res.data;
        },
        async enableOption(id: string, credentials: string): Promise<void> {
            const { $getAuthedApi } = useNuxtApp();
            await $getAuthedApi().post(`/payment/option/${id}/enable`, { credentials });

            const optionIdx = this.paymentOptions.findIndex((o) => o.id === id);
            this.paymentOptions.splice(optionIdx, 1, { ...this.paymentOptions[optionIdx], enabled: false });
        },
        async disableOption(id: string): Promise<void> {
            const { $getAuthedApi } = useNuxtApp();
            await $getAuthedApi().post<UserOauthProvider>(`/payment/option/${id}/disable`);

            const optionIdx = this.paymentOptions.findIndex((o) => o.id === id);
            this.paymentOptions.splice(optionIdx, 1, { ...this.paymentOptions[optionIdx], enabled: false });
        },
    },
    getters: {
        yookassaOption(state): PaymentOption | null {
            return state.paymentOptions.find((p) => p.name === "yookassa");
        },
    },
});
