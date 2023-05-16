<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    modelValue: boolean;
    disabled: boolean;
  }>(),
  {
    modelValue: false,
    disabled: false,
  }
);

const emits = defineEmits<{
  (e: "update:modelValue", checked: boolean): void;
}>();
</script>

<template>
  <div
    class="switch"
    :class="{
      'switch--active': props.modelValue,
      'switch--disabled': props.disabled,
    }"
    @click="!props.disabled && emits('update:modelValue', !props.modelValue)"
  >
    <div class="switch__ball"></div>
  </div>
</template>

<style scoped lang="scss">
.switch {
  position: relative;
  width: 50px;
  height: 25px;
  padding: 4px;
  border-radius: 25px;
  background-color: var(--gray-100);
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;

  &--disabled {
    opacity: 50%;
  }

  &__ball {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 17px;
    height: 17px;
    background-color: var(--gray-200);
    border-radius: 50%;
    transition: transform 0.2s ease-in-out;

    &::after {
      position: absolute;
      top: 50%;
      left: 50%;
      content: "";
      width: 4px;
      height: 4px;
      transform: translate(-50%, -50%);
      border-radius: 50%;
      background-color: var(--accent);
      opacity: 0;
    }
  }

  &--active {
    background-color: var(--accent);
    transition: background-color 0.2s ease-in-out;

    .switch__ball {
      background-color: var(--gray-100);
      transform: translate(26px, -50%);

      &::after {
        opacity: 1;
      }
    }
  }
}
</style>
