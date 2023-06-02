<script setup lang="ts">
import { useAsyncData, useRouter } from "#app";
import { useProductStore } from "~/stores/product";

const router = useRouter();

const productStore = useProductStore();
async function onCreateProduct(): Promise<void> {
  const product = await productStore.createProduct();
  await router.push({ name: "panel-product-id", params: { id: product.id } });
}

const pageSize = ref(5);
await useAsyncData("products", () => productStore.fetchProducts("", 0, pageSize.value));

const currentPage = ref(1);
const query = ref("");

watch(
  [query, currentPage],
  async () => {
    await useAsyncData("products-update", () =>
      productStore.fetchProducts(query.value, (currentPage.value - 1) * pageSize.value, pageSize.value)
    );
  },
  { immediate: false }
);

const filterOpen = ref(false);
</script>

<template>
  <div class="page">
    <ModalProductsFilter v-model="filterOpen"></ModalProductsFilter>
    <header class="page__header">
      <h1 class="page__title headline-large">Ваши продукты</h1>
      <ControlButton @click="onCreateProduct">
        <nuxt-icon name="plus"></nuxt-icon>
        Создать новый продукт
      </ControlButton>
    </header>
    <div class="page__filter filter">
      <ControlInput v-model="query" size="small" placeholder="Сапоги">
        <template #left-icon>
          <nuxt-icon name="search"></nuxt-icon>
        </template>
      </ControlInput>
      <div class="filter-open label-medium" @click="filterOpen = true">
        Фильтры <nuxt-icon name="filter"></nuxt-icon>
      </div>
    </div>
    <ul v-if="productStore.productsInfo" class="page__list">
      <li v-for="p in productStore.productsInfo.products" :key="p.id" class="page__product">
        <CardsProduct :product="p"></CardsProduct>
      </li>
    </ul>
    <ControlPagination
      v-model="currentPage"
      class="page__pagination"
      :max-display-count="3"
      :items-count="productStore.productsInfo.count"
      :page-size="pageSize"
    ></ControlPagination>
  </div>
</template>

<style scoped lang="scss">
.page {
  position: relative;

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__title {
    color: var(--gray-400);
  }

  &__filter {
    margin-top: 20px;
  }

  &__list {
    margin-top: 20px;
  }

  &__product {
    &:not(:last-child) {
      margin-bottom: 15px;
    }
  }

  &__pagination {
    margin: 55px auto 0;
  }
}

.filter {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 13px 20px;
  border-radius: 10px;
  background-color: var(--surface);
}
</style>
