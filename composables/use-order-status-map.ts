import { Order } from "~/models/order.model";

export function useOrderStatusMap(): Record<Order["status"], string> {
    return {
        created: "Создан",
        delivery: "В доставке",
        paid: "Оплачен",
        succeeded: "Доставлен",
    };
}
