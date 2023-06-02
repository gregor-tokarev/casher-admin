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

export class CartProduct {
    id: string;
    count: number;
    createdAt: string;
    product: Product;
    updatedAt: string;
}

export class AdminProductsResponse extends Product {
    revenue: number;
    soldCount: number;
    overallRating: number;
}

export class AdminProductResponseDto {
    products: AdminProductsResponse[];
    count: number;
}
