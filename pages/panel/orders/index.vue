<script setup lang="ts">
import { useRoute, useRouter } from "#app";
import { useOrderStore } from "~/stores/order";
import { computed } from "#imports";

const orderStore = useOrderStore();
const pageSize = ref(20);
const route = useRoute();
const router = useRouter();

const currentPage = computed({
  get() {
    return route.query.page ? parseInt(route.query.page as string) : 1;
  },
  set(value: number) {
    router.replace({ query: { ...route.query, page: value } });
  },
});

await useAsyncData("orders", () => orderStore.fetchOrders(pageSize.value * (currentPage.value - 1), pageSize.value));

watch([currentPage], async ([page]) => {
  await useAsyncData("orders", () => orderStore.fetchOrders(pageSize.value * (page - 1), pageSize.value));
});
</script>

<template>
  <div class="page">
    <div class="page__head">
      <h1 class="page__title headline-large">Заказы</h1>
      <nuxt-link to="/panel/orders/settings">
        <ControlButton color="gray">
          <nuxt-icon name="settings"></nuxt-icon>
          Настройки оплаты
        </ControlButton>
      </nuxt-link>
    </div>
    <template v-if="orderStore.ordersInfo">
      <div class="page__list">
        <div class="page__labels labels">
          <div class="labels__product-name label-small">
            <nuxt-icon name="cart"></nuxt-icon>
            Товар
          </div>
          <div class="labels__status label-small">
            <nuxt-icon name="record-circle"></nuxt-icon>
            статус
          </div>
          <div class="labels__buyer label-small">
            <nuxt-icon name="user"></nuxt-icon>
            пользователь
          </div>
          <div class="labels__total-sum label-small">
            <nuxt-icon name="ruble"></nuxt-icon>
            сумма
          </div>
          <div class="labels__date label-small">
            <nuxt-icon name="clock"></nuxt-icon>
            Дата создания
          </div>
          <div class="labels__date label-small">
            <nuxt-icon name="clock"></nuxt-icon>
            Дата Оплаты
          </div>
          <div class="labels__date label-small">
            <nuxt-icon name="clock"></nuxt-icon>
            Дата доставки
          </div>
        </div>
        <CardsOrder
          v-for="(o, idx) in orderStore.ordersInfo.orders"
          :key="o.id"
          :order="o"
          :even="(idx + 1) % 2 === 0"
        ></CardsOrder>
      </div>
      <ControlPagination
        v-model="currentPage"
        class="page__pagination"
        :max-display-count="10"
        :items-count="orderStore.ordersInfo.count"
        :page-size="pageSize"
      ></ControlPagination>
    </template>
    <div v-else class="empty headline-small">Пока никто не создал</div>
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

  &__pagination {
    margin-top: 55px;
  }
}

.labels {
  display: flex;
  align-items: center;
  color: var(--gray-300);
  padding: 0 5px 5px;
  border-bottom: 1px solid var(--gray-200);

  &__product-name {
    width: 10%;
  }

  &__status {
    width: 15%;
  }

  &__buyer {
    width: 21%;
  }

  &__total-sum {
    width: 12%;
  }

  &__date {
    width: 14%;
  }
}

.empty {
  margin: 100px auto 0;
  text-align: center;
  color: var(--gray-300);
}
</style>
