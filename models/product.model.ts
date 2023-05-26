import { AppFile } from "~/models/file.model";
import { Category } from "~/models/category.model";
import { Review } from "~/models/review.model";

export class Product {
    id: string;
    createdAt: string;
    updatedAt: string;
    draft: boolean;
    title: string;
    description?: string;
    photos?: AppFile[];
    reviews?: Review[];
    price: number;
    priceWithDiscount?: number;
    priceCurrency: "ruble" | "dollar";
    category: Category;
    additionalFields: Record<string, any>;
}
