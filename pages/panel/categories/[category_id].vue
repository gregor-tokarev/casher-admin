<script setup lang="ts">
import useVuelidate from "@vuelidate/core";
import { helpers, required } from "@vuelidate/validators";
import { useAsyncData, useRouter } from "#app";
import { useCategoryStore } from "~/stores/category";

const categoryStore = useCategoryStore();

const router = useRouter();
const route = useRoute();

await Promise.all([
  useAsyncData(`category-${route.params.category_id}`, () => categoryStore.fetchOne(route.params.category_id)),
]);

const formState = reactive({
  name: categoryStore.currentCategory.name,
  parentId: categoryStore.currentCategory.parentId,
});

const v$ = useVuelidate(
  {
    name: { required: helpers.withMessage("Обязательное поле", required) },
    parentId: {},
  },
  formState
);

const selectOptions = computed(() =>
  categoryStore.categories
    .filter((c) => c.id !== categoryStore.currentCategory.id)
    .map((c) => ({ id: c.id, value: c.id, label: c.name }))
);

async function onSubmit(): Promise<void> {
  await categoryStore.updateCategory(route.params.category_id, formState.name, formState.parentId);
  await router.push({ name: "panel-categories" });
}

async function onClose(value): Promise<void> {
  if (!value) {
    await router.push({ name: "panel-categories" });
  }
}
</script>

<template>
  <ModalBase model-value @update:model-value="onClose">
    <div class="edit">
      <form class="edit__form">
        <fieldset class="edit__field field">
          <div class="field__head">
            <div class="field__name label-large">Название категории</div>
            <div class="field__error label-medium">
              <template v-if="v$.name.$errors.length">{{ v$.name.$errors[0].$message }}</template>
            </div>
          </div>
          <ControlInput
            v-model.trim.number="v$.name.$model"
            size="big"
            placeholder="Лапти"
            :error="v$.name.$error"
            @blur="v$.name.$touch"
          ></ControlInput>
        </fieldset>
        <fieldset class="edit__field field">
          <div class="field__head">
            <div class="field_name label-large">Родительская категория</div>
            <div class="field__error label-medium">
              <template v-if="v$.parentId.$errors.length">{{ v$.parentId.$errors[0].$message }}</template>
            </div>
          </div>
          <ControlSelect
            v-model="v$.parentId.$model"
            :options="selectOptions"
            size="big"
            placeholder="Лапти"
            :error="v$.parentId.$error"
            @blur="v$.parentId.$touch"
          ></ControlSelect>
        </fieldset>
        <ControlButton class="edit__submit" big @click.prevent="onSubmit">Сохранить</ControlButton>
      </form>
    </div>
  </ModalBase>
</template>

<style scoped lang="scss">
.edit {
  &__field {
    &:not(:last-of-type) {
      margin-bottom: 20px;
    }
  }

  &__submit {
    margin-top: 40px;
  }
}
</style>
