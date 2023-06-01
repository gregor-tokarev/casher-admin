<script setup lang="ts">
import useVuelidate from "@vuelidate/core";
import { helpers, minLength, required, sameAs } from "@vuelidate/validators";
import { useAuthStore } from "~/stores/auth";

definePageMeta({
  layout: "auth",
});

const formState = reactive({
  email: "",
  password: "",
  repeatedPassword: "",
});

const password = computed(() => formState.password);

const passwordVisible = ref(false);

const v$ = useVuelidate(
  {
    email: {
      required: helpers.withMessage("Обязательное поле", required),
      email: helpers.withMessage("Невалидный email", required),
    },
    password: {
      required: helpers.withMessage("Обязательное поле", required),
      minLength: helpers.withMessage("Минимальная длинна 8", minLength(8)),
    },
    repeatedPassword: {
      required: helpers.withMessage("Обязательное поле", required),
      sameAs: helpers.withMessage("Должен совпадать с паролем введенным выше", sameAs(password)),
    },
  },
  formState
);

const authStore = useAuthStore();

const serverError = ref(false);

async function onSubmit(): Promise<void> {
  v$.value.$touch();
  if (v$.value.$error) return;

  try {
    await authStore.addfirst(v$.value.email.$model, v$.value.password.$model);
  } catch (err) {
    serverError.value = true;
  }
}
</script>

<template>
  <div class="auth">
    <h1 class="auth__title headline-large">Создание аккаунта</h1>
    <p class="auth__text body-medium">
      Создайте первого(root) менеджера в этом магазине, он будет иметь абсолютные права на магазин, сможет добавлять
      новых менеджеров и выдавать им права
    </p>
    <form class="auth__form form">
      <fieldset class="form__field field">
        <div class="field__head">
          <div class="field__name label-large">email</div>
          <div class="field__error label-small">
            <template v-if="v$.email.$errors.length">{{ v$.email.$errors[0].$message }}</template>
          </div>
        </div>
        <ControlInput
          v-model="v$.email.$model"
          placeholder="lesha@mail.ru"
          size="big"
          :error="v$.email.$error"
          @enter.prevent="onSubmit"
          @blur="v$.email.$touch"
        ></ControlInput>
      </fieldset>
      <fieldset class="form__field field">
        <div class="field__head">
          <div class="field__name label-large">Пароль</div>
          <div class="field__error label-small">
            <template v-if="v$.password.$errors[0]">{{ v$.password.$errors[0].$message }}</template>
          </div>
        </div>
        <ControlInput
          v-model="v$.password.$model"
          placeholder="strong password"
          size="big"
          :type="passwordVisible ? 'text' : 'password'"
          :error="v$.password.$error"
          @enter.prevent="onSubmit"
          @blur="v$.password.$touch"
        >
          <template #right-icon>
            <nuxt-icon name="eye" @click="passwordVisible = !passwordVisible"></nuxt-icon>
          </template>
        </ControlInput>
      </fieldset>
      <fieldset class="form__field field">
        <div class="field__head">
          <div class="field__name label-large">Повторите пароль</div>
          <div class="field__error label-small">
            <template v-if="v$.repeatedPassword.$errors[0]">{{ v$.repeatedPassword.$errors[0].$message }}</template>
          </div>
        </div>
        <ControlInput
          v-model="v$.repeatedPassword.$model"
          placeholder="strong password"
          size="big"
          :type="passwordVisible ? 'text' : 'password'"
          :error="v$.repeatedPassword.$error"
          @enter.prevent="onSubmit"
          @blur="v$.repeatedPassword.$touch"
        >
          <template #right-icon>
            <nuxt-icon name="eye" @click="passwordVisible = !passwordVisible"></nuxt-icon>
          </template>
        </ControlInput>
      </fieldset>
      <div v-if="serverError" class="form__server-error label-large">Вы не можете создать нового пользователя</div>
      <ControlButton class="form__submit" big @click.prevent="onSubmit">Создать и войти</ControlButton>
    </form>
  </div>
</template>

<style scoped lang="scss"></style>
