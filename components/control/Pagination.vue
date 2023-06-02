<script setup lang="ts">
interface Props {
  itemsCount: number;
  pageSize: number;
  maxDisplayCount?: number;
  modelValue: number;
}

const props = defineProps<Props>();

interface Emits {
  (e: "update:modelValue", value: number): void;
}

const emits = defineEmits<Emits>();

const pagesCount = computed(() => Math.ceil(props.itemsCount / props.pageSize));
const maxPages = computed(() => props.maxDisplayCount ?? 10);

const pages = computed(() => {
  const pages = [];

  if (pagesCount.value <= maxPages.value) {
    for (let i = 0; i < pagesCount.value; i++) {
      pages.push(i + 1);
    }

    return pages;
  }

  const halfOfDisplayedPages = Math.floor(maxPages.value / 2);

  const hasLeftSpace = props.modelValue - halfOfDisplayedPages > 0;
  const hasRightSpace = props.modelValue + halfOfDisplayedPages < pagesCount.value;

  let pagesStart: number;
  let pagesEnd: number;

  if (hasLeftSpace && !hasRightSpace) {
    pagesStart = pagesCount.value - maxPages.value;
    pagesEnd = pagesCount.value;
  } else if (!hasLeftSpace && hasRightSpace) {
    pagesStart = 0;
    pagesEnd = maxPages.value;
  } else {
    pagesStart = props.modelValue - halfOfDisplayedPages;
    pagesEnd = props.modelValue + halfOfDisplayedPages;
  }

  for (let i = pagesStart; i < pagesEnd; i++) {
    pages.push(i + 1);
  }

  return pages;
});

function updateModelValue(value: number): void {
  if (value < 0 || value > pagesCount.value) return;
  emits("update:modelValue", value);
}
</script>

<template>
  <ul class="pagination">
    <li class="pagination__item pagination__page" @click="updateModelValue(modelValue - 1)">
      <nuxt-icon name="arrow"></nuxt-icon>
    </li>
    <template v-for="(page, idx) in pages" :key="idx">
      <li
        class="pagination__item pagination__page label-medium"
        :class="{ 'pagination__page--active': page === modelValue }"
        @click="emits('update:modelValue', page)"
      >
        {{ page }}
      </li>
    </template>
    <li class="pagination__item pagination__page pagination__item--rotated" @click="updateModelValue(modelValue + 1)">
      <nuxt-icon name="arrow"></nuxt-icon>
    </li>
  </ul>
</template>

<style scoped lang="scss">
.pagination {
  display: flex;
  align-items: flex-end;
  justify-content: center;

  &__page {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 25px;
    height: 25px;
    color: var(--gray-400);
    border-radius: 5px;
    cursor: pointer;
    background-color: var(--surface);

    &--active {
      background-color: var(--gray-400);
      color: var(--gray-100);
    }
  }

  &__item {
    &:not(:last-child) {
      margin-right: 5px;
    }

    &--rotated {
      transform: rotate(180deg);
    }
  }
}
</style>
