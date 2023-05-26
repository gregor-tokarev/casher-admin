<script setup lang="ts">
interface Props {
  admin: {
    id: number;
    email: string;
    permissions: string[];
  };
  isAdmin: boolean;
  isYou: boolean;
}

interface Emits {
  (e: "delete", id: number): void;
}

const emits = defineEmits<Emits>();

const props = defineProps<Props>();
</script>

<template>
  <div class="admin">
    <div class="admin__first-row">
      <div class="admin__email title-large">
        <span>{{ props.admin.email }}</span>
        <span v-if="props.isYou" class="admin__is-you">(Вы)</span>
      </div>
      <ControlsButton v-if="props.isAdmin && !props.isYou" color="red" @click="emits('delete', props.admin.id)">
        Удалить
      </ControlsButton>
    </div>
    <div class="admin__permissions">
      <div class="admin__group">
        <div class="admin__group-title label-large">менеджеры</div>
        <div class="admin__permission-item label-large">
          <ControlsSwitch :disabled="props.isAdmin"></ControlsSwitch>
          <span>добавлять менеджеров</span>
        </div>
        <div class="admin__permission-item label-large">
          <ControlsSwitch :disabled="props.isAdmin"></ControlsSwitch>
          <span>добавлять менеджеров</span>
        </div>
      </div>
      <div class="admin__group">
        <div class="admin__group-title label-large">менеджеры</div>
        <div class="admin__permission-item label-large">
          <ControlsSwitch :disabled="props.isAdmin"></ControlsSwitch>
          <span>добавлять менеджеров</span>
        </div>
        <div class="admin__permission-item label-large">
          <ControlsSwitch :disabled="props.isAdmin"></ControlsSwitch>
          <span>добавлять менеджеров</span>
        </div>
        <div class="admin__permission-item label-large">
          <ControlsSwitch :disabled="props.isAdmin"></ControlsSwitch>
          <span>добавлять менеджеров</span>
        </div>
      </div>
      <div class="admin__group">
        <div class="admin__group-title label-large">менеджеры</div>
        <div class="admin__permission-item label-large">
          <ControlsSwitch :disabled="props.isAdmin"></ControlsSwitch>
          <span>добавлять менеджеров</span>
        </div>
        <div class="admin__permission-item label-large">
          <ControlsSwitch :disabled="props.isAdmin"></ControlsSwitch>
          <span>добавлять менеджеров</span>
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
