<script setup lang="ts">
interface Props {
  modelValue: boolean;
}

const props = defineProps<Props>();

interface Emits {
  (e: "update:modelValue", value: boolean): void;
}

const emits = defineEmits<Emits>();
</script>

<template>
  <div v-if="props.modelValue" class="modal">
    <div class="modal__overlay" @click="emits('update:modelValue', false)"></div>
    <div class="modal__body">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped lang="scss">
.modal {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  &__overlay {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: var(--black);
    opacity: 0.3;
  }

  &__body {
    position: absolute;
    top: 50%;
    left: 50%;
    min-width: 500px;
    background-color: var(--surface);
    padding: 30px;
    border-radius: 20px;
    transform: translate(-50%, -50%);
  }
}
</style>
