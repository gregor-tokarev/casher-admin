<script setup lang="ts">
import useVuelidate from "@vuelidate/core";
import { email, helpers, required } from "@vuelidate/validators";
import { useRouter } from "#app";
import { definePageMeta } from "#imports";
import { useAuthStore } from "~/stores/auth";

definePageMeta({
  layout: "auth",
});

const formState = reactive({
  email: "",
});

const v$ = useVuelidate(
  {
    email: {
      required: helpers.withMessage("Обязательное поле", required),
      email: helpers.withMessage("Невалидный email", email),
    },
  },
  formState
);

const router = useRouter();
const authStore = useAuthStore();

const serverError = ref(false);

async function onSubmit() {
  v$.value.$touch();
  if (v$.value.$error) return;

  try {
    const res = await authStore.checkEmail(v$.value.email.$model);

    if (res.message === "set_password") {
      await router.push({ name: "auth-set_password", query: { email: formState.email } });
    } else if (res.message === "ok") {
      await router.push({ name: "auth-login", query: { email: formState.email } });
    }
  } catch (err) {
    serverError.value = true;
  }
}
</script>

<template>
  <div class="auth">
    <h1 class="auth__title headline-large">Вход</h1>
    <p class="auth__text body-medium">Email на который вы зарегестированны</p>
    <form class="auth__form auth-form">
      <fieldset class="auth-form__field auth-field">
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
      <div v-if="serverError" class="auth-form__server-error label-large">Не получается войти, вас нет в системе</div>
      <ControlButton class="auth-form__submit" big @click.prevent="onSubmit">Войти</ControlButton>
    </form>
  </div>
</template>

<style scoped lang="scss"></style>
