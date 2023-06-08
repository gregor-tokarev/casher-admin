import { User } from "~/models/user.model";
import { CartProduct } from "~/models/product.model";

export class Order {
    id: string;
    createdAt: string;
    updatedAt: string;
    status: "created" | "paid" | "delivery" | "succeeded";
    products: CartProduct[];
    owner: User;
}

export class OrdersResponseDto {
    count: number;
    orders: Order[];
}

export class PaymentOption {
    id: string;
    name: string;
    enabled: boolean;
    credentials?: Record<string, string>;
}
