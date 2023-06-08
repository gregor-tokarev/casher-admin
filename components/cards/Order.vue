<script setup lang="ts">
import { Order } from "~/models/order.model";
import { useOrderStatusMap } from "~/composables/use-order-status-map";

interface Props {
  order: Order;
  even: boolean;
}

const props = defineProps<Props>();

const dayjs = useDayjs();

const dateCreated = computed(() => dayjs(props.order.createdAt).format("DD.MM.YYYY hh:mm"));
const datePaid = computed(() => dayjs(props.order.updatedAt).format("DD.MM.YYYY hh:mm"));

const statusMap = useOrderStatusMap();

const totalSum = computed(() =>
  props.order.products.reduce((acc, p) => {
    acc += p.count * p.product.priceWithDiscount;
    return acc;
  }, 0)
);

const title = computed(() =>
  props.order.products.reduce((acc, p) => {
    acc += p.product.title;
    return acc + " ";
  }, "")
);
</script>

<template>
  <div class="order title-medium" :class="{ 'order--even': even }">
    <div class="order__product-name">{{ title }}</div>
    <div class="order__status status">
      <nuxt-icon
        class="status__circle"
        :class="{ 'status__circle--green': order.status === 'succeeded' }"
        name="record-circle"
      ></nuxt-icon>
      {{ statusMap[order.status] }}
    </div>
    <div class="order__buyer">{{ order.owner.name }} {{ order.owner.surname }}</div>
    <div class="order__total-sum">{{ totalSum }}₽</div>
    <div class="order__created-at order__date">{{ dateCreated }}</div>
    <div class="order__paid-at order__date">{{ datePaid }}</div>
  </div>
</template>

<style scoped lang="scss">
.order {
  display: flex;
  align-items: center;
  height: 45px;
  color: var(--gray-400);
  background-color: var(--surface);
  padding: 0 5px;
  min-width: 1015px;

  &--even {
    background-color: var(--gray-200);
  }

  > * {
    white-space: nowrap;
  }

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

.status {
  display: flex;
  align-items: center;

  &__circle {
    margin-right: 5px;
    color: #f7f397;

    &--green {
      color: #9dd8a2;
    }
  }
}
</style>
