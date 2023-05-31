<script setup lang="ts">
interface Props {
  modelValue: string;
  type: "text" | "password";
  placeholder: string;
  size: "small" | "big";
  error: boolean;
}

interface Emits {
  (e: "update:modelValue", value: string): void;
  (e: "enter", value: void): void;
  (e: "blur", value: InputEvent): void;
}

withDefaults(defineProps<Props>(), {
  modelValue: "",
  type: "text",
  placeholder: "",
  size: "small",
  error: false,
});

const emits = defineEmits<Emits>();

const control = ref(null);

function focus() {
  const el = control.value as HTMLInputElement;
  control && el.focus();
}

function onInput(_event: KeyboardEvent): void {
  emits("update:modelValue", control.value.value);
}
</script>

<template>
  <div class="input" :class="{ 'input--big': size === 'big', 'input--error': error }" @click="focus()">
    <div class="input__icon input__left-icon">
      <slot name="left-icon"></slot>
    </div>
    <input
      ref="control"
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      class="input__control"
      @input="onInput($event)"
      @keydown.enter="emits('enter', undefined)"
      @blur="emits('blur', $event)"
    />
    <div class="input__icon input__right-icon">
      <slot name="right-icon"></slot>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use "assets/styles/typography";

.input {
  display: flex;
  align-items: center;
  padding: 5px 10px;
  background-color: var(--gray-100);
  border-radius: 10px;
  border: 1px solid var(--gray-100);

  &--error {
    border-color: var(--error);
    color: var(--error);
  }

  &__control {
    width: 100%;
    background-color: transparent;
    border: none;
    outline: none;
    color: inherit;

    &::placeholder {
      color: var(--gray-300);
    }

    @include typography.label-medium;
  }

  &__icon {
    &:not(:empty) {
      width: 16px;
      height: 16px;
    }
  }

  &__left-icon {
    &:not(:empty) {
      margin-right: 5px;
    }
  }

  &__right-icon {
    &:not(:empty) {
      margin-left: 5px;
    }
  }

  &--big {
    padding: 10px 15px;

    .input__control {
      @include typography.headline-medium;
    }

    .input__left-icon {
      &:not(:empty) {
        margin-right: 10px;
      }
    }

    .input__right-icon {
      &:not(:empty) {
        margin-left: 10px;
      }
    }
  }
}
</style>
