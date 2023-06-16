<script setup lang="ts">
import useVuelidate from "@vuelidate/core";
import { helpers, minLength, required, sameAs } from "@vuelidate/validators";
import { useRoute, useRouter } from "#app";
import { computed, definePageMeta } from "#imports";
import { useAuthStore } from "~/stores/auth";

definePageMeta({
  layout: "auth",
});

const passwordVisible = ref(false);

const formState = reactive({
  password: "",
  repeatedPassword: "",
});
const password = computed(() => formState.password);

const v$ = useVuelidate(
  {
    repeatedPassword: {
      required: helpers.withMessage("Обязательное поле", required),
      sameAs: helpers.withMessage("Должен повторять пароль", sameAs(password)),
    },
    password: {
      required: helpers.withMessage("Обязательное поле", required),
      minLength: helpers.withMessage((ctx) => `Минимальная длинна ${ctx.$params.min}`, minLength(8)),
    },
  },
  formState
);

const router = useRouter();
const route = useRoute();
const authStore = useAuthStore();

const userEmail = computed(() => route.query.email);

const serverError = ref(false);

async function onSubmit() {
  v$.value.$touch();
  if (v$.value.$error) return;

  try {
    if (typeof userEmail.value === "string") {
      await authStore.setPassword(userEmail.value, formState.password);
      await authStore.login(userEmail.value, formState.password);

      await router.push("/panel");
    }
  } catch (err) {
    serverError.value = true;
  }
}
</script>

<template>
  <div class="auth">
    <h1 class="auth__title headline-large">Установите пароль</h1>
    <p class="auth__text body-medium">
      Вы устанавливаете пароль для {{ userEmail }} если это не ваш email, то закройте вкладку и не переходите больше по
      ссылке
    </p>
    <form class="auth__form auth-form">
      <fieldset class="auth-form__field auth-field">
        <div class="field__head">
          <div class="field__name label-large">Пароль</div>
          <div class="field__error label-small">
            <template v-if="v$.password.$errors.length">{{ v$.password.$errors[0].$message }}</template>
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
      <fieldset class="auth-form__field auth-field">
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
      <div v-if="serverError" class="auth-form__server-error label-large">Пароль уже установлен</div>
      <ControlButton class="auth-form__submit" big @click.prevent="onSubmit">Установить и войти</ControlButton>
    </form>
  </div>
</template>

<style scoped lang="scss"></style>
