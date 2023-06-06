<script setup lang="ts">
import useVuelidate from "@vuelidate/core";
import { helpers, required } from "@vuelidate/validators";
import { useRouter } from "#app";
import { AdminPermissions } from "~/models/admin-user.model";
import { useManagerStore } from "~/stores/manager";

const router = useRouter();
const managerStore = useManagerStore();

const formState = reactive({
  email: "",
  permissions: [],
});

const groups = ref([
  {
    title: "Продукты",
    permissions: [
      { value: false, permissionName: AdminPermissions.CREATE_PRODUCTS, name: "Создавать продукты" },
      { value: false, permissionName: AdminPermissions.DELETE_PRODUCTS, name: "Удалять продукты" },
      { value: false, permissionName: AdminPermissions.UPDATE_PRODUCTS, name: "Редактировать продукты" },
    ],
  },
  {
    title: "менеджеры",
    permissions: [
      { value: false, permissionName: AdminPermissions.ADD_ADMIN, name: "добавлять  менеджеров" },
      { value: false, permissionName: AdminPermissions.DELETE_ADMIN, name: "удалять менеджеров" },
    ],
  },
  {
    title: "Настройки",
    permissions: [
      { value: false, permissionName: AdminPermissions.PAYMENT_SETTINGS, name: "Изменять настройки платежей" },
      { value: false, permissionName: AdminPermissions.AUTH_SETTINGS, name: "Изменять настройки авторизации" },
    ],
  },
]);

const permissions = computed(() => {
  const permissions = [];

  groups.value.forEach((g) => {
    g.permissions.forEach((p) => {
      if (p.value) permissions.push(p.permissionName);
    });
  });

  return permissions;
});

watchEffect(() => {
  formState.permissions = permissions;
});

const v$ = useVuelidate(
  {
    email: { required: helpers.withMessage("Обязательное поле", required) },
  },
  formState
);

async function onSubmit(): Promise<void> {
  await managerStore.inviteManager(formState.email, formState.permissions);
  await router.push("/panel/managers");
}
</script>

<template>
  <ModalBase model-value @update:model-value="router.push('/panel/managers')">
    <div class="new-manager">
      <h1 class="new-manager__title headline-large">Новый менеджер</h1>
      <p class="new-manager__text body-medium">
        Вы приглашаете человека по почте, устанавливаете его возможности на платформе, после он заходит и устанавливает
        себе пароль
      </p>
      <form class="new-manager__form">
        <fieldset class="new-manager__field field">
          <div class="field__head">
            <div class="field__name label-large">Email менеджера</div>
            <div v-if="v$.email.$error" class="field__error caption">{{ v$.email.$errors[0].$message }}</div>
          </div>
          <ControlInput
            v-model="v$.email.$model"
            size="big"
            :error="v$.email.$error"
            placeholder="some@mail.ru"
            @blur="v$.email.$touch"
            @enter="onSubmit"
          ></ControlInput>
        </fieldset>
        <div class="new-manager__permissions">
          <div v-for="(g, idx) in groups" :key="idx" class="group">
            <div class="group__title label-large">{{ g.title }}</div>
            <div class="group__list">
              <div v-for="(p, jdx) in g.permissions" :key="jdx" class="permission group__permission label-large">
                <ControlSwitch v-model="p.value"></ControlSwitch>
                <span class="permission__text">{{ p.name }}</span>
              </div>
            </div>
          </div>
        </div>
        <ControlButton big class="new-manager__submit" @click.prevent="onSubmit">
          <nuxt-icon name="send"></nuxt-icon>
          Отправить приглашение
        </ControlButton>
      </form>
    </div>
  </ModalBase>
</template>

<style scoped lang="scss">
.new-manager {
  width: 800px;

  &__title {
    color: var(--gray-400);
    margin-bottom: 10px;
  }

  &__text {
    color: var(--gray-300);
  }

  &__form {
    margin-top: 30px;
  }

  &__permissions {
    display: grid;
    grid-template-columns: 1fr 1fr;
    margin-top: 40px;
    gap: 20px;
  }

  &__submit {
    margin-top: 50px;
  }
}

.group {
  &__title {
    margin-bottom: 20px;
  }

  &__permission {
    &:not(:last-child) {
      margin-bottom: 15px;
    }
  }
}

.permission {
  display: flex;
  align-items: center;
  color: var(--gray-400);

  &__text {
    margin-left: 15px;
  }
}
</style>
