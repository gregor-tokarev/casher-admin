<script setup lang="ts">
import { useOrderStore } from "~/stores/order";

const orderStore = useOrderStore();
await useAsyncData("paymentOptions", () => orderStore.fetchPaymentOptions());

async function onEnable(id: string, credentials: Record<string, string>): Promise<void> {
  await orderStore.enableOption(id, JSON.stringify(credentials));
}

async function onToggle(id: string, value: boolean): Promise<void> {
  if (value) {
    const option = orderStore.paymentOptions.find((p) => p.id === id);
    option.credentials && (await orderStore.enableOption(id, JSON.stringify(option.credentials)));
  } else {
    await orderStore.disableOption(id);
  }
}
</script>

<template>
  <div class="page">
    <div class="page__title headline-large">Настройки оплаты</div>
    <div class="page__text body-large">
      Настройки оплаты - это методы с помощью, которых пользователи могут расплачиваться в вашем магазине. Для того,
      чтобы включить опцию, вам необходимо завести учетную запись в онлайн кассе(вк, яндекс) и получить для нее ключи
      доступа, а потом ввести их в карточку метода.
    </div>
    <div class="page__list">
      <PaymentYookassa
        v-if="orderStore.yookassaOption"
        :enabled="orderStore.yookassaOption.enabled"
        :credentials="orderStore.yookassaOption.credentials"
        @toggle="onToggle(orderStore.yookassaOption.id, $event)"
        @submit="onEnable(orderStore.yookassaOption.id, $event)"
      ></PaymentYookassa>
    </div>
  </div>
</template>

<style scoped lang="scss">
.page {
  &__title {
    color: var(--gray-400);
    margin-bottom: 20px;
  }

  &__text {
    color: var(--gray-300);
  }

  &__list {
    margin-top: 30px;
  }
}
</style>
