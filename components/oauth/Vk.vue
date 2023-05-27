<script setup lang="ts">
import useVuelidate from "@vuelidate/core";
import { minLength, required } from "@vuelidate/validators";

interface Props {
  clientID: string;
  clientSecret: string;
  serviceSecret: string;
}

const props = withDefaults(defineProps<Props>(), {
  clientID: "",
  clientSecret: "",
  serviceSecret: "",
});

const state = reactive({
  clientID: props.clientID,
  clientSecret: props.clientSecret,
  serviceSecret: props.serviceSecret,
});

interface Emits {
  (e: "submit", value: typeof state): void;
}

const emits = defineEmits<Emits>();

const toggle = ref(false);

const v$ = useVuelidate(
  {
    clientID: { required, minLength: minLength(8) },
    clientSecret: { required, minLength: minLength(71) },
    serviceSecret: { required, minLength: minLength(20) },
  },
  state
);

function submit(): void {
  v$.value.$touch();
  if (v$.value.$invalid) return;

  emits("submit", state);
}
</script>

<template>
  <div class="card">
    <div class="card__first-row">
      <ControlsSwitch v-model="toggle" class="trs"></ControlsSwitch>
      <img src="assets/img/vk.svg" class="card__icon" alt="vk" />
      <span class="title-large">VK</span>
      <a class="card__info caption" target="_blank" href="https://dev.vk.com/api/access-token/getting-started">
        Как получить ключи доступа для для vk?
      </a>
    </div>
    <AnimationCollapse>
      <div v-if="toggle">
        <div class="card__form">
          <div class="card__credentials">
            <fieldset class="card__fields control">
              <div class="control__head">
                <div class="control__label label-medium">ClientID</div>
                <div v-if="v$.clientID.required.$invalid && v$.clientID.$dirty" class="control__error label-medium">
                  Обязательное поле
                </div>
              </div>
              <ControlsInput
                v-model="v$.clientID.$model"
                name="clientID"
                placeholder="51461222"
                :error="v$.clientID.$error"
                @enter="submit"
                @blur="v$.clientID.$touch"
              >
                <template #left-icon>
                  <nuxt-icon name="key"></nuxt-icon>
                </template>
              </ControlsInput>
            </fieldset>
            <fieldset class="card__fields control">
              <div class="control__head">
                <div class="control__label label-medium">ClientSecret</div>
                <div
                  v-if="v$.clientSecret.required.$invalid && v$.clientSecret.$dirty"
                  class="control__error label-medium"
                >
                  Обязательное поле
                </div>
              </div>
              <ControlsInput
                v-model="v$.clientSecret.$model"
                name="clientSecret"
                placeholder="e622104de622104de622104dfbe5332c2bee622e622104d857973e9f5b3d5e7fd41e23f"
                :error="v$.clientSecret.$error"
                @enter="submit"
                @blur="v$.clientSecret.$touch"
              >
                <template #left-icon>
                  <nuxt-icon name="key"></nuxt-icon>
                </template>
              </ControlsInput>
            </fieldset>
            <fieldset class="card__fields control">
              <div class="control__head">
                <div class="control__label label-medium">ServiceSecret</div>
                <div
                  v-if="v$.serviceSecret.required.$invalid && v$.serviceSecret.$dirty"
                  class="control__error label-medium"
                >
                  Обязательное поле
                </div>
              </div>
              <ControlsInput
                v-model="v$.serviceSecret.$model"
                placeholder="dEOlTOC74KAr30g2j7fB"
                :error="v$.serviceSecret.$error"
                @enter="submit"
                @blur="v$.serviceSecret.$touch"
              >
                <template #left-icon>
                  <nuxt-icon name="key"></nuxt-icon>
                </template>
              </ControlsInput>
            </fieldset>
          </div>
          <ControlsButton class="card__save" @click="submit"> Сохранить опцию </ControlsButton>
        </div>
      </div>
    </AnimationCollapse>
  </div>
</template>

<style scoped lang="scss">
.card {
  padding: 15px;
  background-color: var(--surface);
  border-radius: 20px;

  &__first-row {
    display: flex;
    align-items: center;
  }

  &__icon {
    margin: 0 5px 0 10px;
  }

  &__info {
    margin-left: auto;
    color: var(--accent);
    text-decoration: underline;
  }

  &__form {
    padding-top: 20px;
  }

  &__credentials {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 15px 30px;
  }

  &__save {
    margin-top: 15px;
  }
}
</style>
