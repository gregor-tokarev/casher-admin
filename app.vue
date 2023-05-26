<template>
  <div>
    <LayoutAuthHeader></LayoutAuthHeader>
    <OauthVk></OauthVk>
    <ControlsBugReport></ControlsBugReport>
    <ControlsPagination
      v-model="pValue"
      :items-count="500"
      :page-size="11"
      :max-display-count="10"
    ></ControlsPagination>
    <CardsProductReview :review="review"></CardsProductReview>
  </div>
</template>

<script setup lang="ts">
import { plainToInstance } from "class-transformer";
import { Review } from "./models/review.model";
import { User } from "~/models/user.model";

const pValue = ref(3);

const review = ref<Review>(
  plainToInstance(Review, {
    id: 234,
    content: "dsfsdf",
    score: 4,
    reviewer: plainToInstance(User, {
      name: "sfdfs",
      surname: "sdfsdf",
      avatarUrl: "https://gravatar.com/avatar/7bcc5de11e4c5a0e092f2478e5f6144e?s=400&d=robohash&r=x",
    }),
  })
);
</script>

<style lang="scss"></style>
