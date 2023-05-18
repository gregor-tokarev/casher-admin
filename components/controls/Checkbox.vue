<script setup lang="ts">
interface Props {
  modelValue: boolean;
}

const props = withDefaults(defineProps<Props>(), { modelValue: false });

interface Emits {
  (e: "update:modelValue", value: boolean): void;
}

const emits = defineEmits<Emits>();
</script>

<template>
  <div
    class="checkbox"
    :class="{ 'checkbox--checked': props.modelValue }"
    @click="emits('update:modelValue', !props.modelValue)"
  >
    <nuxt-icon
      v-if="props.modelValue"
      class="checkbox__check"
      name="check"
    ></nuxt-icon>
  </div>
</template>

<style scoped lang="scss">
.checkbox {
  width: 16px;
  height: 16px;
  border-radius: 5px;
  background-color: var(--gray-100);
  cursor: pointer;

  &--checked {
    background-color: var(--accent);
  }

  &__check {
    width: 12px;
    height: 12px;
    color: var(--gray-100);
  }
}
</style>
