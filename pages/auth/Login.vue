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

const authStorage = useAuthStore();

async function onSubmit() {
  v$.value.$touch();
  if (v$.value.$error) return;

  await authStorage.login(v$.value.email.$model, v$.value.password.$model);
}
</script>

<template>
  <div class="login">
    <h1 class="login__title headline-large">Вход</h1>
    <p class="login__text body-medium">
      Заполните email, который вы указали админу и пароль, который выставили, когда перешли по ссылке из письма
    </p>
    <form class="login__form form">
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
      <ControlButton class="form__submit" big @click.prevent="onSubmit">Войти</ControlButton>
    </form>
    <nuxt-link class="login__forget-password label-medium" to="/auth/forget-password">забыли пароль?</nuxt-link>
  </div>
</template>

<style scoped lang="scss">
.login {
  position: absolute;
  top: 50%;
  left: 50%;
  padding: 30px 30px 50px 30px;
  transform: translate(-50%, -50%);
  border-radius: 20px;
  background-color: var(--surface);
  width: 610px;
  border: 1px solid var(--gray-200);

  &__title {
    color: var(--gray-400);
    text-align: center;
    margin-bottom: 10px;
  }

  &__text {
    color: var(--gray-300);
    text-align: center;
    margin-bottom: 20px;
  }

  &__forget-password {
    display: block;
    text-decoration: none;
    margin-top: 10px;
    color: var(--accent);
  }
}

.form {
  &__field {
    &:not(:last-child) {
      margin-bottom: 10px;
    }
  }

  &__submit {
    width: 100%;
    margin-top: 40px;
  }
}

.field {
  &__head {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
  }

  &__name {
    color: var(--gray-300);
  }

  &__error {
    color: var(--error);
  }
}
</style>
