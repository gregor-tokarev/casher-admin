export interface Tree<T> {
    node: T;
    children: Tree<T>[];
}

export class Category {
    id: string;
    name: string;
    level: number;
    parentId: string | null;
}
