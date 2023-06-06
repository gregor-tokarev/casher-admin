import { defineStore } from "pinia";
import { Category, Tree } from "~/models/category.model";

export const useCategoryStore = defineStore("category", {
    state: () => ({
        categories: [] as Category[],
        categoryTrees: [] as Tree<Category>[],
        currentCategory: null as null | Category,
    }),
    actions: {
        async fetchCategoriesTree(): Promise<Tree<Category>[]> {
            const { $getAuthedApi } = useNuxtApp();
            const res = await $getAuthedApi().get<Tree<Category>[]>("/category/all-tree");

            this.categoryTrees = res.data;

            return res.data;
        },
        async fetchOne(id: string): Promise<Category> {
            const { $getAuthedApi } = useNuxtApp();
            const res = await $getAuthedApi().get<Tree<Category>>(`/category/${id}`);

            this.currentCategory = res.data.node;

            return res.data.node;
        },
        async createCategory(): Promise<Category> {
            const { $getAuthedApi } = useNuxtApp();
            const res = await $getAuthedApi().post<Category>("/category/");

            this.currentCategory = res.data;
            this.categoryTrees.push({
                node: res.data,
                children: [],
            });

            return res.data;
        },
        async updateCategory(categoryId: string, name: string, parentId: string = null): Promise<Category> {
            const initialCategory = this.findCategory(categoryId);

            const { $getAuthedApi } = useNuxtApp();
            const res = await $getAuthedApi().put<Category>(`/category/${categoryId}`, {
                name,
                parentId,
            });

            this.currentCategory = res.data;

            const category = getNodeById(this.categoryTrees, res.data.id);
            category.node.name = res.data.name;

            if (initialCategory.parentId !== res.data.parentId) {
                const oldParent = getNodeById(this.categoryTrees, initialCategory.parentId);
                const newParent = getNodeById(this.categoryTrees, res.data.parentId);

                if (oldParent) {
                    const oldIndex = oldParent.children.findIndex((c) => c.node.id === categoryId);
                    oldParent.children.splice(oldIndex, 1);
                }

                newParent.children.push(category);
            }

            return res.data;
        },
        async deleteCategory(categoryId: string): Promise<void> {
            const { $getAuthedApi } = useNuxtApp();
            await $getAuthedApi().delete<Category>(`/category/${categoryId}`);

            this.currentCategory = null;

            const category = getNodeById(this.categoryTrees, categoryId);
            if (category.node.level === 1) {
                const categoryIdx = this.categoryTrees.findIndex((c) => c.node.id === categoryId);
                this.categoryTrees.splice(categoryIdx, 1);
            } else {
                const categoryParent = getNodeById(this.categoryTrees, category.node.parentId);
                const categoryIdx = categoryParent.children.findIndex((c) => c.node.id === categoryId);
                categoryParent.children.splice(categoryIdx, 1);
            }
        },
    },
    getters: {
        categories(state): Category[] {
            return state.categoryTrees.reduce((acc, tree) => {
                acc = acc.concat(getCategoryTree(tree));
                return acc;
            }, []);
        },
        findCategory(state) {
            return (id: string) => {
                const category = getNodeById(state.categoryTrees, id);
                return category.node;
            };
        },
    },
});

function getNodeById(trees: Tree<Category>[], id: string): Tree<Category> | null {
    for (const tree of trees) {
        const foundNode = getNodeByIdRecursive(tree, id);
        if (foundNode !== null) {
            return foundNode;
        }
    }

    return null;
}

function getNodeByIdRecursive(tree: Tree<Category>, id: string): Tree<Category> | null {
    if (tree.node.id === id) {
        return tree;
    }

    for (const child of tree.children) {
        const foundNode = getNodeByIdRecursive(child, id);
        if (foundNode !== null) {
            return foundNode;
        }
    }

    return null;
}

function getCategoryTree(tree: Tree<Category>): Category[] {
    const result: Category[] = [];

    // Add the current node to the result array
    result.push(tree.node);

    tree.children.forEach((child) => {
        const childValues = getCategoryTree(child);
        result.push(...childValues);
    });

    return result;
}
