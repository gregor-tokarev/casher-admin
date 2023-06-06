<script setup lang="ts">
import { nanoid } from "nanoid";
import { AdminProductsResponse } from "~/models/product.model";

interface Props {
  product: AdminProductsResponse;
}

defineProps<Props>();

const runtimeConfig = useRuntimeConfig();
const mediaUrl = computed(() => runtimeConfig.public.mediaUrl);
const componentId = ref(nanoid(3));
</script>

<template>
  <div class="product">
    <div class="product__slider slider">
      <div class="slider__nav slider__prev">
        <img :id="'left-arrow-' + componentId" src="/assets/img/slider-arrow.svg" alt="slider arrow" />
      </div>
      <div class="slider__nav slider__next">
        <img :id="'right-arrow-' + componentId" src="/assets/img/slider-arrow.svg" alt="slider arrow" />
      </div>
      <Swiper
        :slides-per-view="1"
        :modules="[SwiperPagination, SwiperNavigation]"
        :navigation="{ nextEl: `#right-arrow-${componentId}`, prevEl: `#left-arrow-${componentId}` }"
        :pagination="{ clickable: true }"
      >
        <SwiperSlide v-for="file in product.photos" :key="file.etag">
          <img class="product__img" :src="mediaUrl + file.path" :alt="file.originalname" />
        </SwiperSlide>
      </Swiper>
    </div>
    <div class="product__wrapper">
      <div class="product__header">
        <nuxt-link :to="{ name: 'panel-product-id', params: { id: product.id } }">
          <h3 class="product__title title-large">{{ product.title }}</h3>
        </nuxt-link>
        <div v-if="product.category" class="product__category label-medium">
          <nuxt-icon name="badge"></nuxt-icon>
          {{ product.category.name }}
        </div>
        <div class="product__prices">
          <span class="product__price title-small">{{ product.price }}₽</span>
          <span class="product__price-with-discount title-large">{{ product.priceWithDiscount }}₽</span>
        </div>
      </div>
      <div class="product__body">
        <p class="product__text body-medium">
          {{ product.description }}
        </p>
        <ul class="product__info">
          <li class="product__stat stat body-medium">
            <span class="stat__label">Всего проданно:</span>
            <span>{{ product.soldCount }}</span>
          </li>
          <li class="product__stat stat body-medium">
            <span class="stat__label">Выручка:</span>
            <span>{{ product.revenue }}₽</span>
          </li>
          <li class="product__stat stat body-medium">
            <span class="stat__label">Рейтинг:</span>
            <ul v-if="product.overallRating !== -1" class="rating">
              <li v-for="(_, idx) in Array(product.overallRating)" :key="idx">
                <nuxt-icon name="star-filled"></nuxt-icon>
              </li>
              <li v-for="(_, idx) in Array(5 - product.overallRating)" :key="idx">
                <nuxt-icon name="star-outlined"></nuxt-icon>
              </li>
            </ul>
            <div v-else class="no-rating">нет оценок</div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.product {
  display: flex;
  padding: 15px 50px 15px 20px;
  border-radius: 20px;
  background-color: var(--surface);
  border: 1px solid var(--gray-200);

  &__slider {
    max-width: 215px;
  }

  &__img {
    width: 215px;
    height: 215px;
    object-fit: cover;
  }

  &__wrapper {
    margin-left: 30px;
    flex-grow: 1;
  }

  &__header {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
  }

  &__title {
    color: var(--gray-400);
  }

  &__category {
    padding: 4.5px 8px;
    background-color: var(--gray-100);
    color: var(--gray-400);
    border-radius: 5px;
    margin-left: 20px;
  }

  &__prices {
    display: flex;
    align-items: baseline;
    margin-left: auto;
  }

  &__price {
    position: relative;
    margin-left: auto;
    color: var(--gray-300);

    &::after {
      position: absolute;
      top: 50%;
      right: 0;
      left: 0;
      transform: translateY(-50%);
      height: 1px;
      background-color: var(--error);
      content: "";
    }
  }

  &__price-with-discount {
    margin-left: 10px;
    color: var(--gray-400);
  }

  &__body {
    display: flex;
    align-items: flex-start;
  }

  &__text {
    margin-right: 35px;
    color: var(--gray-300);
  }

  &__info {
    margin-left: auto;
    padding-left: 35px;
    border-left: 1px solid var(--gray-200);
  }

  &__stat {
    &:not(:last-child) {
      margin-bottom: 10px;
    }
  }
}

.stat {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-width: 200px;
  color: var(--gray-400);

  &__label {
    color: var(--gray-300);
  }
}

.rating {
  display: flex;
  align-items: center;
  color: var(--accent);
}

.slider {
  position: relative;

  &__nav {
    position: absolute;
    top: 50%;
    z-index: 10;
    transform: translateY(-50%);
    cursor: pointer;
    fill: transparent;
    stroke: var(--gray-400);
  }

  &__prev {
    left: 6px;
  }

  &__next {
    right: 6px;
    transform: translateY(-50%) rotate(180deg);
  }

  :deep(.swiper-pagination-bullet) {
    opacity: 1;
    background-color: var(--gray-200);
  }

  :deep(.swiper-pagination-bullet-active) {
    background-color: var(--gray-400);
  }
}
</style>
