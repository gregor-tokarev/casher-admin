<script setup lang="ts">
import { useAsyncData } from "#app";
import { useManagerStore } from "~/stores/manager";
import { useAuthStore } from "~/stores/auth";
import { useDeleteModal } from "#imports";

const managerStore = useManagerStore();
const authStore = useAuthStore();
await useAsyncData("managers", () => managerStore.fetchManagers());

async function onDelete(id: string): Promise<void> {
  const res = await useDeleteModal({
    title: "Вы уверены, что хотите удалить менеджера?",
    subtitle: "Вы не сможете отменить это дейстивие",
  });
  if (res) {
    await managerStore.revokeManager(id);
  }
}

async function onUpdatePermissions(id: string, permissions: string[]): Promise<void> {
  await managerStore.changePermissions(id, permissions);
}
</script>

<template>
  <div class="page">
    <div class="page__head">
      <h1 class="page__title headline-large">Менеджеры</h1>
      <nuxt-link to="/panel/managers/new_manager">
        <ControlButton>
          <nuxt-icon name="plus"></nuxt-icon>
          Добавить нового менеджера
        </ControlButton>
      </nuxt-link>
    </div>
    <div class="page__list">
      <CardsAdmin
        v-for="a in managerStore.managers"
        :key="a.id"
        class="page__item"
        :is-you="authStore.currentUser.id === a.id"
        :is-admin="!authStore.currentUser.addedBy"
        :admin="a"
        @delete="onDelete($event)"
        @update:permissions="onUpdatePermissions($event[0], $event[1])"
      ></CardsAdmin>
    </div>
    <nuxt-page></nuxt-page>
  </div>
</template>

<style scoped lang="scss">
.page {
  &__head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
  }

  &__item {
    &:not(:last-child) {
      margin-bottom: 20px;
    }
  }
}
</style>
