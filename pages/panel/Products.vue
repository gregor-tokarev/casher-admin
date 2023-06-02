<script setup lang="ts">
import { useRouter } from "#app";
import { useProductStore } from "~/stores/product";

const router = useRouter();

const productStore = useProductStore();
async function onCreateProduct(): Promise<void> {
  const product = await productStore.createProduct();
  await router.push({ name: "panel-product-id", params: { id: product.id } });
}
</script>

<template>
  <div class="page">
    <header class="page__header">
      <h1 class="page__title headline-large">Ваши продукты</h1>
      <ControlButton @click="onCreateProduct">
        <nuxt-icon name="plus"></nuxt-icon>
        Создать новый продукт
      </ControlButton>
    </header>
  </div>
</template>

<style scoped lang="scss">
.page {
  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__title {
    color: var(--gray-400);
  }
}
</style>
