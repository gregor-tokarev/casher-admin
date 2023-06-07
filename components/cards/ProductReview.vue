<script setup lang="ts">
import { Review } from "~/models/review.model";

interface Props {
  review: Review;
}

defineProps<Props>();
</script>

<template>
  <div class="card">
    <div class="card__head">
      <img
        :src="review.reviewer.avatarUrl"
        :alt="review.reviewer.name + ' ' + review.reviewer.surname"
        class="card__avatar"
      />
      <div class="card__head-right">
        <div class="card__name title-small">{{ review.reviewer.name }} {{ review.reviewer.surname }}</div>
        <div class="card__reviews">
          <nuxt-icon v-for="(_, idx) in Array(review.score)" :key="idx" name="star-filled"></nuxt-icon>
          <nuxt-icon v-for="(_, idx) in Array(5 - review.score)" :key="idx" name="star-outlined"></nuxt-icon>
        </div>
      </div>
    </div>
    <p class="card__text body-medium">
      {{ review.content }}
    </p>
  </div>
</template>

<style scoped lang="scss">
.card {
  padding: 20px;
  background-color: var(--surface);
  border-radius: 20px;

  &__head {
    display: flex;
    align-items: center;
  }

  &__head-right {
    margin-left: 10px;
  }

  &__avatar {
    width: 50px;
    height: 50px;
    object-fit: cover;
    overflow: hidden;
    border-radius: 50%;
  }

  &__name {
    color: var(--gray-400);
  }

  &__reviews {
    margin-top: 5px;
    color: var(--accent);
  }

  &__text {
    margin-top: 15px;
    color: var(--gray-400);
  }
}
</style>
