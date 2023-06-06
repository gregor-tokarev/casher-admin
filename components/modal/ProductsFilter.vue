<script setup lang="ts">
import { useRoute, useRouter } from "#app";
import { useCategoryStore } from "~/stores/category";

interface Props {
  modelValue: boolean;
}

withDefaults(defineProps<Props>(), {
  modelValue: false,
});

interface Emits {
  (e: "update:modelValue", value: boolean): void;
}

const emits = defineEmits<Emits>();

const categoryStore = useCategoryStore();

const route = useRoute();
const router = useRouter();

const initialCategories = computed(() => {
  const categoriesStr = route.query.categories as string;
  if (!categoriesStr) return [];

  return categoriesStr.split(";");
});
const categories = ref(initialCategories.value);

function onToggleCategory(categoryId: string): void {
  const categoryIdx = categories.value.findIndex((c) => c === categoryId);

  if (categoryIdx === -1) {
    categories.value.push(categoryId);
  } else {
    categories.value.splice(categoryIdx, 1);
  }
}

function onApplyFilter(): void {
  emits("update:modelValue", false);

  router.replace({ query: { ...route.query, categories: categories.value.join(";") } });
  categories.value = [];
}

function onResetFilter(): void {
  emits("update:modelValue", false);

  router.replace({ query: { ...route.query, categories: null } });
  categories.value = [];
}
</script>

<template>
  <teleport to="body">
    <div class="filter">
      <div class="filter__overlay" @click="onApplyFilter"></div>
      <div class="filter__body">
        <h1 class="filter__title headline-large">Фильтры</h1>
        <ul class="filter__categories">
          <li v-for="t in categoryStore.categoryTrees" :key="t.node.id" class="category filter__item">
            <div class="category__top" @click="onToggleCategory(t.node.id)">
              <ControlCheckbox
                :model-value="categories.includes(t.node.id)"
                class="category__checkbox"
              ></ControlCheckbox>
              <div class="category__name label-medium">{{ t.node.name }}</div>
            </div>
          </li>
        </ul>
        <div class="filter__actions">
          <ControlButton color="gray" @click="onResetFilter">Сбросить</ControlButton>
          <ControlButton @click="onApplyFilter">Применить</ControlButton>
        </div>
      </div>
    </div>
  </teleport>
</template>

<style scoped lang="scss">
.filter {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 10;

  &__overlay {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: var(--black);
    opacity: 0.3;
  }

  &__body {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    width: 315px;
    padding: 20px 15px;
    background-color: var(--surface);
  }

  &__item {
    &:not(:last-child) {
      margin-bottom: 5px;
    }
  }

  &__title {
    color: var(--gray-400);
  }

  &__categories {
    margin-top: 30px;
  }

  &__actions {
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 15px;

    > * {
      flex-grow: 1;

      &:first-child {
        margin-right: 10px;
      }
    }
  }
}

.category {
  &__top {
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  &__checkbox {
    margin-right: 5px;
  }
}
</style>
