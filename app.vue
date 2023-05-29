<template>
  <div>
    <CardsCategory :top-category="category" :child-categories="childCategories"></CardsCategory>
    <CardsCategory :top-category="category" :child-categories="childCategories"></CardsCategory>
    <CardsCategory :top-category="category" :child-categories="childCategories"></CardsCategory>
  </div>
</template>

<script setup lang="ts">
import { Category } from "~/models/category.model";

const category = ref<Category>({
  id: "sdofijds",
  name: "sdfoijd",
  level: 1,
  parentId: null,
});

const childCategories = ref<Category[]>([
  {
    id: "sdofijds",
    name: "sdfoijd",
    level: 1,
    parentId: null,
  },
  {
    id: "sdofijds",
    name: "sdfoijd",
    level: 1,
    parentId: null,
  },
  {
    id: "sdofijds",
    name: "sdfoijd",
    level: 1,
    parentId: null,
  },
]);
</script>

<style lang="scss"></style>
