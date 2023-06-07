<script setup lang="ts">
import { useRoute } from "#app";
import useVuelidate from "@vuelidate/core";
import { helpers, required } from "@vuelidate/validators";
import { useFileDialog } from "@vueuse/core";
import { useProductStore } from "~/stores/product";
import { useCategoryStore } from "~/stores/category";

const route = useRoute();
const productStore = useProductStore();
const categoryStore = useCategoryStore();
const runtimeConfig = useRuntimeConfig();

const mediaUrl = computed(() => runtimeConfig.public.mediaUrl);

await Promise.all([
  useAsyncData(String(route.params.id), () => productStore.fetchDetail(String(route.params.id))),
  useAsyncData("allCategories", () => categoryStore.fetchCategoriesTree()),
  useAsyncData(`reviews-${route.params.id}`, () => productStore.fetchReviews(String(route.params.id))),
]);

const formState = reactive({
  title: productStore.currentProduct.title ?? "",
  description: productStore.currentProduct.description ?? "",
  price: productStore.currentProduct.price,
  category: productStore.currentProduct.category,
});

const updating = ref(false);

watch([formState], async () => {
  if (updating.value) return;

  try {
    updating.value = true;
    await productStore.updateProduct(String(route.params.id), formState);
  } catch (e) {
  } finally {
    updating.value = false;
  }
});

const v$ = useVuelidate(
  {
    title: { required: helpers.withMessage("Обязательное поле", required) },
    description: { required: helpers.withMessage("Обязательное поле", required) },
    price: { required: helpers.withMessage("Обязательное поле", required) },
    category: { required: helpers.withMessage("Обязательное поле", required) },
  },
  formState
);

const categoriesSelectOptions = computed(() =>
  categoryStore.categories.map((c) => ({ label: c.name, id: c.id, value: c.id }))
);

const { open: openFileExplorer, onChange } = useFileDialog();
onChange(async (files) => {
  updating.value = true;
  try {
    await productStore.addPhotos(String(route.params.id), files);
  } finally {
    updating.value = false;
  }
});

async function onDeletePhoto(photoId: string): Promise<void> {
  await productStore.deletePhotos(String(route.params.id), photoId);
}

const form = ref(null);
const photosListWidth = ref("0px");
onMounted(() => {
  const formEl = form.value as HTMLFormElement;
  const padding = window.getComputedStyle(formEl, null).getPropertyValue("padding-left");

  photosListWidth.value = formEl.clientWidth - parseInt(padding) * 2 + "px";
});
</script>

<template>
  <div class="product">
    <form ref="form" class="product__form form">
      <fieldset class="form__field field">
        <div class="field__head">
          <div class="field__name label-large">Название товара</div>
          <div class="field__error label-medium">
            <template v-if="v$.title.$errors.length">{{ v$.title.$errors[0].$message }}</template>
          </div>
        </div>
        <ControlInput
          v-model="v$.title.$model"
          size="big"
          placeholder="Колоши"
          :error="v$.title.$error"
          @blur="v$.title.$touch"
        ></ControlInput>
      </fieldset>
      <fieldset class="form__field field">
        <div class="field__head">
          <div class="field__name label-large">Цена</div>
          <div class="field__error label-medium">
            <template v-if="v$.price.$errors.length">{{ v$.price.$errors[0].$message }}</template>
          </div>
        </div>
        <ControlInput
          v-model.trim.number="v$.price.$model"
          size="big"
          placeholder="200"
          :error="v$.price.$error"
          @blur="v$.price.$touch"
        >
          <template #left-icon>
            <nuxt-icon name="ruble"></nuxt-icon>
          </template>
        </ControlInput>
      </fieldset>
      <fieldset class="field form__field photos">
        <ul class="photos__list" :style="{ width: photosListWidth }">
          <li class="photos__item photo photo-add" @click="openFileExplorer">
            <nuxt-icon class="photo-add__icon" name="plus"></nuxt-icon>
            <p class="photo-add__text title-medium">добавить новое изображение</p>
          </li>
          <li v-for="p in productStore.currentProduct.photos" :key="p.id" class="photos__item photo photo-add">
            <div class="photo__remove" @click="onDeletePhoto(p.id)">
              <nuxt-icon name="basket"></nuxt-icon>
            </div>
            <img :src="mediaUrl + p.path" :alt="p.originalname" />
          </li>
        </ul>
      </fieldset>
      <fieldset class="form__field field">
        <div class="field__head">
          <div class="field__name label-large">Категория</div>
          <div class="field__error label-medium">
            <template v-if="v$.category.$errors.length">{{ v$.category.$errors[0].$message }}</template>
          </div>
        </div>
        <ControlSelect
          v-model="v$.category.$model"
          :options="categoriesSelectOptions"
          size="big"
          placeholder="одежда"
          :error="v$.category.$error"
          @blur="v$.category.$touch"
        ></ControlSelect>
      </fieldset>
      <fieldset class="form__field field">
        <div class="field__head">
          <div class="field__name label-large">Описание</div>
          <div class="field__error label-medium">
            <template v-if="v$.description.$errors.length">{{ v$.description.$errors[0].$message }}</template>
          </div>
        </div>
        <ControlTextarea
          v-model="v$.description.$model"
          size="big"
          placeholder="главная информация о вашем продукте"
          :error="v$.description.$error"
          @blur="v$.description.$touch"
        ></ControlTextarea>
      </fieldset>
      <div class="product__saving label-large">
        <template v-if="updating">
          <nuxt-icon class="product__loading product__updating-icon" name="loading"></nuxt-icon> Сохранение
        </template>
        <template v-else>
          <nuxt-icon class="product__updating-icon" name="double-check"></nuxt-icon> Сохранен
        </template>
      </div>
    </form>
    <div class="reviews product__reviews">
      <h3 class="reviews__title title-medium">Оценки</h3>
      <div class="reviews__list">
        <CardsProductReview v-for="r in productStore.reviews" :key="r.id" :review="r"></CardsProductReview>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.product {
  max-width: 100%;

  &__saving {
    display: flex;
    color: var(--gray-200);
    margin-top: 20px;
  }

  &__updating-icon {
    display: block;
    margin-right: 5px;
  }

  &__loading {
    animation: spin 2s infinite linear;
  }

  &__reviews {
    margin-top: 40px;
  }
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

.form {
  max-width: 100%;
  padding: 30px 20px;
  background-color: var(--surface);
  border-radius: 20px;

  &__field {
    &:not(:last-child) {
      margin-bottom: 20px;
    }
  }
}

.photos {
  margin-top: -20px;

  &__list {
    display: flex;
    padding-top: 20px;
    overflow-x: auto;
  }

  &__item {
    flex-shrink: 0;

    &:not(:last-child) {
      margin-right: 20px;
    }
  }
}

.reviews {
  &__title {
    color: var(--gray-400);
    margin-bottom: 10px;
  }

  &__list {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
  }
}

.photo {
  position: relative;
  width: 225px;
  height: 225px;
  border-radius: 5px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    overflow: hidden;
  }

  &__remove {
    position: absolute;
    top: -14px;
    right: -14px;
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    background-color: var(--gray-100);
    border-radius: 50%;
    cursor: pointer;
  }
}

.photo-add {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: var(--gray-100);
  cursor: pointer;

  &__icon {
    color: var(--gray-400);

    :deep(svg) {
      width: 66px;
      height: 66px;
    }
  }

  &__text {
    color: var(--gray-400);
    text-align: center;
  }
}
</style>
