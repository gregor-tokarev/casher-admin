<script setup lang="ts">
interface Props {
  big?: boolean;
  color?: "accent" | "gray" | "red";
  disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  big: false,
  color: "accent",
  disabled: false,
});
</script>

<template>
  <button
    class="button"
    :class="{
      'button--big': props.big,
      'button--gray': props.color === 'gray',
      'button--accent': props.color === 'accent',
      'button--red': props.color === 'red',
    }"
    :disabled="props.disabled"
  >
    <slot></slot>
  </button>
</template>

<style scoped lang="scss">
@use "assets/styles/typography";

.button {
  border-radius: 10px;
  padding: 5px 10px;
  background-color: var(--accent);
  border: none;
  cursor: pointer;
  color: var(--gray-400);
  transition: background-color 0.2s, color 0.2s;

  @include typography.label-large;

  &--big {
    padding: 10px 20px;

    @include typography.headline-medium;
  }

  &:hover {
    background-color: var(--accent-hover);
  }

  &--gray {
    background-color: var(--gray-200);

    &:hover {
      background-color: var(--gray-100);
    }
  }

  &--red {
    background-color: var(--error);

    &:hover {
      background-color: var(--error-dark);
    }
  }

  &:disabled {
    background-color: var(--gray-300);
    cursor: default;
  }
}
</style>
