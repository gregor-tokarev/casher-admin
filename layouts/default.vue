<script setup lang="ts">
import { useAuthStore } from "~/stores/auth";

const navList = ref([
  {
    name: "Продукты",
    link: "/panel/products",
    icon: "cart",
  },
  {
    name: "Заказы",
    link: "/panel/orders",
    icon: "dollar",
  },
  {
    name: "Пользователи",
    link: "/panel/users",
    icon: "user",
  },
  {
    name: "Менеджеры",
    link: "/panel/managers",
    icon: "key",
  },
  {
    name: "Категории",
    link: "/panel/categories",
    icon: "list",
  },
]);

const authStore = useAuthStore();

await useAsyncData("user", () => authStore.fetchCurrent());
</script>

<template>
  <div class="layout">
    <LayoutAdminSidebar :nav-list="navList" :user="authStore.currentUser" class="layout__sidebar"></LayoutAdminSidebar>
    <div class="layout__body">
      <slot></slot>
    </div>
    <ControlBugReport></ControlBugReport>
  </div>
</template>

<style scoped lang="scss">
.layout {
  display: flex;
  align-items: flex-start;
  max-width: 100vw;
  height: 100vh;
  background-color: var(--background);

  &__sidebar {
    height: calc(100% - 40px);
    min-width: 300px;
    margin: 20px;
  }

  &__body {
    margin: 20px 50px;
    max-width: calc(100vw - 300px - 100px - 20px);
    flex-grow: 1;
  }
}
</style>
