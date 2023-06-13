<script setup lang="ts">
import { AdminPermissions, AdminUser } from "~/models/admin-user.model";

interface Props {
  admin: AdminUser;
  isAdmin: boolean;
  isYou: boolean;
}

interface Emits {
  (e: "delete", id: string): void;
  (e: "update:permissions", id: [string, string[]]): void;
}

const emits = defineEmits<Emits>();

const props = defineProps<Props>();

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

groups.value.forEach((g) => {
  g.permissions.forEach((p) => {
    if (props.admin.permissions.includes(p.permissionName)) {
      p.value = true;
    }
  });
});

const permissions = computed(() => {
  const permissions = [];

  groups.value.forEach((g) => {
    g.permissions.forEach((p) => {
      if (p.value) permissions.push(p.permissionName);
    });
  });

  return permissions;
});

watch([permissions], ([permissions]) => {
  emits("update:permissions", [props.admin.id, permissions]);
});
</script>

<template>
  <div class="admin">
    <div class="admin__first-row">
      <div class="admin__email title-large">
        <span>{{ props.admin.email }}</span>
        <span v-if="props.isYou" class="admin__is-you">(Вы)</span>
      </div>
      <ControlButton v-if="props.isAdmin && !props.isYou" color="red" @click="emits('delete', props.admin.id)">
        Удалить
      </ControlButton>
    </div>
    <div class="admin__permissions">
      <div v-for="(g, idx) in groups" :key="idx" class="admin__group">
        <div class="admin__group-title label-large">{{ g.title }}</div>
        <div v-for="(p, jdx) in g.permissions" :key="jdx" class="admin__permission-item label-large">
          <ControlSwitch v-model="p.value" :disabled="!props.isAdmin || props.isYou"></ControlSwitch>
          <span>{{ p.name }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.admin {
  background-color: var(--surface);
  border-radius: 20px;
  border: 1px solid var(--gray-200);
  padding: 20px;

  &__first-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
  }

  &__is-you {
    margin-left: 5px;
    color: var(--gray-300);
  }

  &__permissions {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
  }

  &__group {
    > *:not(:last-child) {
      margin-bottom: 15px;
    }
  }

  &__permission-item {
    display: flex;
    align-items: center;
    color: var(--gray-300);

    span {
      margin-left: 15px;
    }
  }
}
</style>
