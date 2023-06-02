<script setup lang="ts">
interface Props {
  modelValue: boolean;
}

withDefaults(defineProps<Props>(), {
  modelValue: false,
});

interface Emits {
  (e: "update:modelValue", value: boolean): void;
}

const emits = defineEmits<Emits>();

function onApplyFilter(): void {
  emits("update:modelValue", false);
}

function onResetFilter(): void {
  emits("update:modelValue", false);
}
</script>

<template>
  <teleport to="body">
    <div v-if="modelValue" class="filter">
      <div class="filter__overlay" @click="onApplyFilter"></div>
      <div class="filter__body">
        <h1 class="filter__title headline-large">Фильтры</h1>
        <div class="filter__actions">
          <ControlButton color="gray" @click="onResetFilter">Сбросить</ControlButton>
          <ControlButton @click="onApplyFilter">Применить</ControlButton>
        </div>
      </div>
    </div>
  </teleport>
</template>

<style scoped lang="scss">
.filter {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 10;

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
    top: 0;
    right: 0;
    bottom: 0;
    width: 315px;
    padding: 20px 15px;
    background-color: var(--background);
  }

  &__title {
    color: var(--gray-400);
  }

  &__actions {
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 15px;

    > * {
      flex-grow: 1;

      &:first-child {
        margin-right: 10px;
      }
    }
  }
}

.contact-modal-enter-active,
.contact-modal-leave-active {
  transition: all 0.2s;
}

.contact-modal-enter-from,
.contact-modal-leave-to {
  transform: translateY(100%);
}

.contact-modal-leave-from,
.contact-modal-enter-to {
  transform: translateY(0);
}
</style>
