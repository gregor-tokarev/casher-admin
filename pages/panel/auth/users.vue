<script setup lang="ts">
import { useAsyncData, useRoute, useRouter } from "#app";
import { useUserStore } from "~/stores/user";
import { computed } from "#imports";

const userStore = useUserStore();
const router = useRouter();
const route = useRoute();

const pageSize = ref(20);
await useAsyncData("users", () => userStore.fetchUsers(0, pageSize.value));

const currentPage = computed({
  get() {
    return route.query.page ? parseInt(route.query.page as string) : 1;
  },
  set(value: number) {
    router.replace({ query: { ...route.query, page: value } });
  },
});

watch(
  () => route.query,
  async (query) => {
    const currentPage = query.page;

    await useAsyncData("products-udpate", () =>
      userStore.fetchUsers(currentPage * pageSize.value, (currentPage + 1) * pageSize.value)
    );
  }
);
</script>

<template>
  <div class="page">
    <div class="page__head">
      <h1 class="page__title headline-large">Пользователи</h1>
      <nuxt-link to="/panel/auth/settings">
        <ControlButton color="gray">
          <nuxt-icon name="settings"></nuxt-icon>
          Настройки аутификации
        </ControlButton>
      </nuxt-link>
    </div>
    <template v-if="userStore.usersInfo">
      <div class="page__list">
        <CardsUser v-for="u in userStore.usersInfo.users" :key="u.id" :user="u"></CardsUser>
      </div>
      <ControlPagination
        v-model="currentPage"
        :page-size="pageSize"
        :max-display-count="10"
        :items-count="userStore.usersInfo.count"
        class="page__pagination"
      ></ControlPagination>
    </template>
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

  &__title {
    color: var(--gray-400);
  }

  &__pagination {
    margin-top: 40px;
  }
}
</style>
