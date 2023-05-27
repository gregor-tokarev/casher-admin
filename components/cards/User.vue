<script setup lang="ts">
import dayjs from "dayjs";
import { UserResponse } from "~/models/user.model";

interface Props {
  user: UserResponse;
}

const props = defineProps<Props>();

const createdAt = computed(() => dayjs(props.user.createdAt).format("DD.MM.YYYY"));
</script>

<template>
  <div class="user">
    <div class="user__head">
      <img :src="user.avatarUrl" :alt="user.name + ' ' + user.surname" class="user__img" />
      <span class="user__name label-large">{{ user.name }} {{ user.surname }}</span>
    </div>
    <ul class="user__meta">
      <li class="user__meta-item meta-item body-medium">
        <div class="meta-item__label">email:</div>
        <div class="meta-item__value">{{ user.oauth.email }}</div>
      </li>
      <li class="user__meta-item meta-item body-medium">
        <div class="meta-item__label">Дата регистрации:</div>
        <div class="meta-item__value">{{ createdAt }}</div>
      </li>
      <li class="user__meta-item meta-item body-medium">
        <div class="meta-item__label">Метод регистрации:</div>
        <div class="meta-item__value">
          {{ user.oauth.provider }}
          <img v-if="user.oauth.provider === 'vk'" class="meta-item__provider-icon" src="/assets/img/vk.svg" alt="vk" />
          <img
            v-if="user.oauth.provider === 'yandex'"
            class="meta-item__provider-icon"
            src="/assets/img/yandex.png"
            alt="yandex"
          />
        </div>
      </li>
      <li class="user__meta-item meta-item body-medium">
        <div class="meta-item__label">Заказал на:</div>
        <div class="meta-item__value">{{ user.totalOrder }}₽</div>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.user {
  padding: 10px 15px;
  background-color: var(--surface);
  border-radius: 20px;

  &__head {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
  }

  &__img {
    width: 30px;
    height: 30px;
    border-radius: 50%;
  }

  &__name {
    margin-left: 5px;
    color: var(--gray-400);
  }

  &__meta-item {
    &:not(:last-child) {
      margin-bottom: 5px;
    }
  }
}

.meta-item {
  display: flex;
  align-items: center;

  &__label {
    color: var(--gray-300);
    min-width: 160px;
  }

  &__provider-icon {
    width: 14px;
    height: 14px;
    margin-left: 3px;
  }

  &__value {
    display: flex;
    align-items: center;
    color: var(--black);
  }
}
</style>
