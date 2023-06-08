<script setup lang="ts">
import { useUserStore } from "~/stores/user";

const userStore = useUserStore();

await useAsyncData("oauth-settings", () => userStore.fetchOauthProfiders());

async function onEnable(id: string, credentials: Record<string, string>): Promise<void> {
  await userStore.enableOption(id, JSON.stringify(credentials));
}

async function onToggle(id: string, value: boolean): Promise<void> {
  if (value) {
    const option = userStore.authProviders.find((p) => p.id === id);
    option.credentials && (await userStore.enableOption(id, JSON.stringify(option.credentials)));
  } else {
    await userStore.disableOption(id);
  }
}
</script>

<template>
  <div class="page">
    <h1 class="page__title headline-large">Настройки аунтификации</h1>
    <p class="page__text body-large">
      Настройки аунтификации - это методы с помощью, которых пользователи могут регестироваться в вашем магазине. Для
      того, чтобы включить опцию, вам необходимо завести учетную запись в провайдере(вк, яндекс) и получить для нее
      секреты, а потом ввести их в карточку метода.
    </p>
    <div class="page__list">
      <OauthVk
        :credentials="userStore.vkProvider.credentials"
        :enabled="userStore.vkProvider.enabled"
        @submit="onEnable(userStore.vkProvider.id, $event)"
        @toggle="onToggle(userStore.vkProvider.id, $event)"
      ></OauthVk>
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
    margin-bottom: 30px;
  }
}
</style>
