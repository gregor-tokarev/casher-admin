<script setup lang="ts">
import { useModalsStore } from "~/stores/modals";

const modalStore = useModalsStore();
</script>

<template>
  <teleport to="body">
    <div v-if="modalStore.deleteModalState" class="confirm">
      <div class="confirm__overlay" @click="modalStore.resolve(false)"></div>
      <div class="confirm__body">
        <h2 class="headline-large">{{ modalStore.deleteModalOptions.title }}</h2>
        <p class="confirm__subtitle body-medium">{{ modalStore.deleteModalOptions.subtitle }}</p>
        <div class="confirm__actions">
          <ControlButton class="confirm__button" color="gray" big @click="modalStore.resolve(false)">
            Отмена
          </ControlButton>
          <ControlButton class="confirm__button" color="red" big @click="modalStore.resolve(true)">
            <nuxt-icon name="basket"></nuxt-icon>
            Удалить
          </ControlButton>
        </div>
      </div>
    </div>
  </teleport>
</template>

<style scoped lang="scss">
.confirm {
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

  &__subtitle {
    margin: 15px 0 40px;
    color: var(--gray-300);
  }

  &__actions {
    display: flex;
    justify-content: space-between;
  }

  &__button {
    width: 47%;
  }
}
</style>
