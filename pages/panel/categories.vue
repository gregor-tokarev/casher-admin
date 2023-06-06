<script setup lang="ts">
import { useRouter } from "#app";
import { useCategoryStore } from "~/stores/category";
import { useDeleteModal } from "#imports";

const categoryStore = useCategoryStore();

await useAsyncData("categoryTrees", () => categoryStore.fetchCategoriesTree());

const router = useRouter();
async function onCreateCategory(): Promise<void> {
  const category = await categoryStore.createCategory();
  await router.push({ name: "panel-categories-category_id", params: { category_id: category.id } });
}

async function onEdit(categoryId: string): Promise<void> {
  await router.push({ name: "panel-categories-category_id", params: { category_id: categoryId } });
}

async function onDelete(categoryId: string): Promise<void> {
  const res = await useDeleteModal({
    title: "Вы уверены, что хотите удалить категорию?",
    subtitle: "Вы не сможете отменить это дейстивие",
  });

  if (!res) return;

  await categoryStore.deleteCategory(categoryId);
}
</script>

<template>
  <div class="page">
    <div class="page__head">
      <h1 class="page__title headline-large">Категории</h1>
      <ControlButton v-if="categoryStore.categoryTrees.length" @click="onCreateCategory">
        <nuxt-icon name="plus"></nuxt-icon>
        Новая категория
      </ControlButton>
    </div>
    <div v-if="categoryStore.categoryTrees.length" class="page__categories">
      <CardsCategory
        v-for="c in categoryStore.categoryTrees"
        :key="c.node.id"
        :child-categories="c.children.map((child) => child.node)"
        :top-category="c.node"
        @edit="onEdit"
        @delete="onDelete($event)"
      ></CardsCategory>
    </div>
    <div v-else class="page__empty empty">
      <div class="empty__text headline-small">У вас пока нет категорий, но вы можете:</div>
      <ControlButton @click="onCreateCategory">
        <nuxt-icon name="plus"></nuxt-icon>
        Создать новую категорию
      </ControlButton>
    </div>
    <nuxt-page></nuxt-page>
  </div>
</template>

<style scoped lang="scss">
.page {
  &__head {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__categories {
    margin-top: 20px;
    padding: 15px 20px;
    background-color: var(--surface);
    border-radius: 20px;
    border: 1px solid var(--gray-200);
  }

  &__empty {
    margin-top: 100px;
  }
}

.empty {
  display: flex;
  align-items: center;
  flex-direction: column;

  &__text {
    margin-bottom: 20px;
    color: var(--gray-300);
  }
}
</style>
