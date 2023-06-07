<script setup lang="ts">
import { useAsyncData, useRoute, useRouter } from "#app";
import { useProductStore } from "~/stores/product";
import { useCategoryStore } from "~/stores/category";
import { computed } from "#imports";

const route = useRoute();
const router = useRouter();

const productStore = useProductStore();
const categoryStore = useCategoryStore();

async function onCreateProduct(): Promise<void> {
  const product = await productStore.createProduct();
  await router.push({ name: "panel-product-id", params: { id: product.id } });
}

const pageSize = ref(5);
await Promise.all([
  useAsyncData("products", () =>
    productStore.fetchProducts("", 0, pageSize.value, route.query?.categories?.split(";") ?? undefined)
  ),
  useAsyncData("categoryTrees", () => categoryStore.fetchCategoriesTree()),
]);

const currentPage = computed({
  get() {
    return route.query.page ? parseInt(route.query.page as string) : 1;
  },
  set(value: number) {
    router.replace({ query: { ...route.query, page: value } });
  },
});
const query = computed({
  get() {
    return route.query.q;
  },
  set(value: string) {
    router.replace({ query: { ...route.query, q: value } });
  },
});

const filtersCount = ref(0);
watch(
  () => route.query,
  async (query) => {
    const categories = query.categories?.split(";");
    if (categories?.length) filtersCount.value = 1;
    else filtersCount.value = 0;

    const q = query.q ?? "";
    const currentPage = query.page;

    await useAsyncData("products-udpate", () => productStore.fetchProducts(q, currentPage, pageSize.value, categories));
  }
);
const filterOpen = ref(false);
</script>

<template>
  <div class="page">
    <ModalProductsFilter v-if="filterOpen" @update:model-value="filterOpen = false"></ModalProductsFilter>
    <header class="page__header">
      <h1 class="page__title headline-large">Ваши продукты</h1>
      <ControlButton v-if="productStore.productsInfo" @click="onCreateProduct">
        <nuxt-icon name="plus"></nuxt-icon>
        Создать новый продукт
      </ControlButton>
    </header>
    <template v-if="productStore.productsInfo">
      <div class="page__filter filter">
        <ControlInput v-model="query" size="small" placeholder="Сапоги">
          <template #left-icon>
            <nuxt-icon name="search"></nuxt-icon>
          </template>
        </ControlInput>
        <div
          class="filter-open label-medium"
          :class="{ 'filter-open--active': filtersCount > 0 }"
          @click="filterOpen = true"
        >
          Фильтры
          <nuxt-icon v-if="filtersCount < 1" name="filter" class="filter-open__icon"></nuxt-icon>
          <div v-else class="filter-open__count caption">{{ filtersCount }}</div>
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
    </template>
    <div v-else class="empty page__empty">
      <p class="empty__text headline-small">У вас пока нет продуктов, но вы можете:</p>
      <ControlButton @click="onCreateProduct">
        <nuxt-icon name="plus"></nuxt-icon>
        Создать новый продукт
      </ControlButton>
    </div>
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

  &__empty {
    margin-top: 100px;
  }
}

.filter-open {
  display: flex;
  align-items: center;

  &--active {
    color: var(--accent);
  }

  &__count {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    color: var(--black);
    background-color: var(--accent);
    margin-left: 10px;
  }

  &__icon {
    margin-left: 10px;
  }
}

.filter {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 13px 20px;
  border-radius: 10px;
  background-color: var(--surface);
  border: 1px solid var(--gray-200);
}

.empty {
  display: flex;
  flex-direction: column;
  align-items: center;

  &__text {
    color: var(--gray-300);
    margin-bottom: 20px;
  }
}
</style>
