<template>
  <div>
    <CardsProductReview :review="review"></CardsProductReview>
    <CardsProduct :product="product"></CardsProduct>
    <PaymentYookassa></PaymentYookassa>
    <CardsOrder :order="order" even></CardsOrder>
    <ControlsTextarea :model-value="text" error placeholder="=sadflajksdf">
      <template #left-icon>
        <nuxt-icon name="key"></nuxt-icon>
      </template>
    </ControlsTextarea>
    <CardsUser :user="user"></CardsUser>
  </div>
</template>

<script setup lang="ts">
import { plainToInstance } from "class-transformer";
import { Review } from "./models/review.model";
import { User, UserOauth, UserResponse } from "~/models/user.model";
import { AdminProductResponseDto, CartProduct, Product } from "~/models/product.model";
import { AppFile } from "~/models/file.model";
import { Category } from "~/models/category.model";
import { Order } from "~/models/order.model";

const text = $ref("");

const user = $ref<UserResponse>(
  plainToInstance(UserResponse, {
    id: "sd98wu4r",
    avatarUrl: "https://gravatar.com/avatar/7bcc5de11e4c5a0e092f2478e5f6144e?s=400&d=robohash&r=x",
    totalOrder: 234234,
    name: "some",
    surname: "some surname",
    sex: "male",
    createdAt: "2022-08-20",

    oauth: plainToInstance(UserOauth, {
      id: "s98whrsdf",
      provider: "yandex",
      token: "sodfhowijf",
      providerId: "sdofij2983rj",
      email: "some@email.ru",
    }),
  })
);

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

const order = $ref<Order>(
  plainToInstance(Order, {
    id: "sdfdsf2342fdsf",
    status: "succeeded",
    createdAt: "2023-09-20",
    updatedAt: "2023-09-20",
    products: plainToInstance(CartProduct, [
      {
        id: "sf249823usf",
        count: 234,
        createdAt: "",
        updatedAt: "",
        product: plainToInstance(Product, {
          id: "s9f84oijsdf",
          createdAt: "",
          updatedAt: "",
          draft: false,
          title: "title",
          description: "",
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
          reviews: [
            plainToInstance(Review, {
              id: "s3248fw9y8923hrnfjw",
              content: "dsfsdf",
              score: 4,
              reviewer: plainToInstance(User, {
                name: "sfdfs",
                surname: "sdfsdf",
                avatarUrl: "https://gravatar.com/avatar/7bcc5de11e4c5a0e092f2478e5f6144e?s=400&d=robohash&r=x",
              }),
            }),
            plainToInstance(Review, {
              id: "s3248fw9y8923hrnfjw",
              content: "dsfsdf",
              score: 4,
              reviewer: plainToInstance(User, {
                name: "sfdfs",
                surname: "sdfsdf",
                avatarUrl: "https://gravatar.com/avatar/7bcc5de11e4c5a0e092f2478e5f6144e?s=400&d=robohash&r=x",
              }),
            }),
          ],
          price: 2334,
          priceWithDiscount: 234,
          priceCurrency: "dollar",
          category: Category,
          additionalFields: {},
        }),
      },
    ]),
    owner: plainToInstance(User, {
      name: "sfdfs",
      surname: "sdfsdf",
      avatarUrl: "https://gravatar.com/avatar/7bcc5de11e4c5a0e092f2478e5f6144e?s=400&d=robohash&r=x",
    }),
  })
);
</script>

<style lang="scss">
.icon {
  width: 60px;
  height: 60px;
}
</style>
