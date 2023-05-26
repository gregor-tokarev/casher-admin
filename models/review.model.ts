import { AppFile } from "~/models/file.model";
import { User } from "~/models/user.model";

export class Review {
    id: string;
    createdAt: string;
    updatedAt: string;
    score: number;
    content: string;
    reviewer: User;
    reviewerId: string;
    photos: AppFile[];
}
