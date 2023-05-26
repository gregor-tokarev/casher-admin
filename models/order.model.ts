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
