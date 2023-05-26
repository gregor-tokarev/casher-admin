<template>
  <div>
    <CardsProductReview :review="review"></CardsProductReview>
    <CardsProduct :product="product"></CardsProduct>
  </div>
</template>

<script setup lang="ts">
import { plainToInstance } from "class-transformer";
import { Review } from "./models/review.model";
import { User } from "~/models/user.model";
import { AdminProductResponseDto } from "~/models/product.model";
import { AppFile } from "~/models/file.model";
import { Category } from "~/models/category.model";

const review = $ref<Review>(
  plainToInstance(Review, {
    id: "s3248fw9y8923hrnfjw",
    content: "dsfsdf",
    score: 4,
    reviewer: plainToInstance(User, {
      name: "sfdfs",
      surname: "sdfsdf",
      avatarUrl: "https://gravatar.com/avatar/7bcc5de11e4c5a0e092f2478e5f6144e?s=400&d=robohash&r=x",
    }),
  })
);

const product = $ref<AdminProductResponseDto>(
  plainToInstance(AdminProductResponseDto, {
    id: "s3248fw9y8923hrnfjw",
    createdAt: "",
    updatedAt: "",
    draft: false,
    title: "sdflkajewoij",
    description: "sfoijo3ijwf",
    revenue: 3424234324,
    overallRating: 3,
    soldCount: 1234,
    photos: [
      plainToInstance(AppFile, {
        originalname: "sdfuhwje",
        etag: "soefhojewijf",
        mimetype: "image/png",
        path: "https://imgflip.com/s/meme/Drake-Hotline-Bling.jpg",
      }),
      plainToInstance(AppFile, {
        originalname: "sdfuhwje",
        etag: "soefhojewijf",
        mimetype: "image/png",
        path: "https://imgflip.com/s/meme/Drake-Hotline-Bling.jpg",
      }),
      plainToInstance(AppFile, {
        originalname: "sdfuhwje",
        etag: "soefhojewijf",
        mimetype: "image/png",
        path: "https://imgflip.com/s/meme/Drake-Hotline-Bling.jpg",
      }),
    ],
    price: 23423,
    priceWithDiscount: 234,
    priceCurrency: "ruble" | "dollar",
    category: plainToInstance(Category, {
      id: "32rfd",
      name: "some category",
      level: 1,
    }),
    additionalFields: {},
  })
);
</script>

<style lang="scss"></style>
