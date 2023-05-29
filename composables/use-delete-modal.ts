import { useModalsStore } from "~/stores/modals";

export interface DeleteModalOptions {
    title: string;
    subtitle: string;
}
export function useDeleteModal(op: DeleteModalOptions) {
    return new Promise((resolve, reject) => {
        const modalStore = useModalsStore();

        modalStore.setDeleteModal(resolve, reject, op);
    });
}
