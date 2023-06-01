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
    link: "/panel/menegers",
    icon: "key",
  },
  {
    name: "Категории",
    link: "/panel/categories",
    icon: "list",
  },
]);

const authStore = useAuthStore();

await authStore.fetchCurrent();
</script>

<template>
  <div class="layout">
    <LayoutAdminSidebar :nav-list="navList" :user="authStore.currentUser" class="layout__sidebar"></LayoutAdminSidebar>
  </div>
</template>

<style scoped lang="scss">
.layout {
  display: flex;
  align-items: flex-start;
  height: 100vh;
  background-color: var(--background);

  &__sidebar {
    height: calc(100% - 40px);
    min-width: 300px;
    margin: 20px;
  }
}
</style>
