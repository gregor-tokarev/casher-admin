import { defineStore } from "pinia";
import { DeleteModalOptions } from "~/composables/use-delete-modal";

export const useModalsStore = defineStore("modals", {
    state: () => ({
        deleteModalOptions: null as DeleteModalOptions | null,
        deleteModalResolver: null as (value: boolean | PromiseLike<boolean>) => void | null,
        deleteModalState: false,
    }),
    actions: {
        setDeleteModal(resolver: (value: boolean | PromiseLike<boolean>) => void, options: DeleteModalOptions): void {
            this.deleteModalState = true;
            this.deleteModalOptions = options;
            this.deleteModalResolver = resolver;
        },
        resolve(value: boolean): void {
            this.deleteModalResolver(value);
            this.deleteModalState = false;

            this.deleteModalState = null;
            this.deleteModalOptions = null;
            this.deleteModalResolver = null;
        },
    },
});
