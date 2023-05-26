<script setup lang="ts">
import { Product } from "~/models/product.model";

interface Props {
  product: Product;
}

defineProps<Props>();
</script>

<template>
  <div class="product">
    <div class="product__slider slider"></div>
    <div class="product__wrapper">
      <div class="product__header"></div>
      <div class="product__body">
        <p class="product__text"></p>
        <ul class="product__stats"></ul>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
