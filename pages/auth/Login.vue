<script setup lang="ts">
import useVuelidate from "@vuelidate/core";
import { email, helpers, required } from "@vuelidate/validators";
import { definePageMeta } from "#imports";
import { useAuthStore } from "~/stores/auth";

definePageMeta({
  layout: "auth",
});

const passwordVisible = ref(false);

const formState = reactive({
  email: "",
  password: "",
});

const v$ = useVuelidate(
  {
    email: {
      required: helpers.withMessage("Обязательное поле", required),
      email: helpers.withMessage("Невалидный email", email),
    },
    password: { required: helpers.withMessage("Обязательное поле", required) },
  },
  formState
);

const authStore = useAuthStore();

const serverError = ref(false);

async function onSubmit() {
  v$.value.$touch();
  if (v$.value.$error) return;

  try {
    await authStore.login(v$.value.email.$model, v$.value.password.$model);
  } catch (err) {
    serverError.value = true;
  }
}
</script>

<template>
  <div class="auth">
    <h1 class="auth__title headline-large">Вход</h1>
    <p class="auth__text body-medium">
      Заполните email, который вы указали админу и пароль, который выставили, когда перешли по ссылке из письма
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
      <div v-if="serverError" class="form__server-error label-large">
        Не получается войти, либо вас нет в системе, либо вы ввели неправильный пароль
      </div>
      <ControlButton class="form__submit" big @click.prevent="onSubmit">Войти</ControlButton>
    </form>
    <nuxt-link class="auth__forget-password label-medium" to="/auth/forget-password">забыли пароль?</nuxt-link>
  </div>
</template>

<style scoped lang="scss"></style>
