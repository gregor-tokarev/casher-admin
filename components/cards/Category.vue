<script setup lang="ts">
import { Category } from "~/models/category.model";

interface Props {
  topCategory: Category;
  childCategories: Category[];
}

defineProps<Props>();

interface Emits {
  (e: "edit", value: string): void;
  (e: "delete", value: string): void;
  (e: "add"): void;
}

const emits = defineEmits<Emits>();

const open = ref(false);
</script>

<template>
  <div class="card">
    <div class="card__body body">
      <div class="body__left">
        <div class="body__arrow" :class="{ 'body__arrow--rotated': open }" @click="open = !open">
          <nuxt-icon name="arrow"></nuxt-icon>
        </div>
        <div class="body__name body-large">{{ topCategory.name }}</div>
      </div>
      <div class="body__actions">
        <ControlButton color="gray" @click="emits('edit', topCategory.id)">
          <nuxt-icon name="pen"></nuxt-icon>
          Редактировать
        </ControlButton>
        <ControlButton color="red" @click="emits('delete', topCategory.id)">
          <nuxt-icon name="basket"></nuxt-icon>
          Удалить
        </ControlButton>
      </div>
    </div>
    <AnimationCollapse>
      <ul v-if="open" class="card__list children body-large">
        <li v-for="c in childCategories" :key="c.id" class="child children__item">
          <div class="child__name">{{ c.name }}</div>
          <div class="child__icon child__edit">
            <nuxt-icon name="pen" @click="emits('edit', c.id)"></nuxt-icon>
          </div>
          <div class="child__icon child__delete">
            <nuxt-icon name="basket" @click="emits('delete', c.id)"></nuxt-icon>
          </div>
        </li>
        <li class="children__add add" @click="emits('add')">
          <div class="add__plus">
            <nuxt-icon name="plus"></nuxt-icon>
          </div>
          <div class="add__text caption">Добавить</div>
        </li>
      </ul>
    </AnimationCollapse>
  </div>
</template>

<style scoped lang="scss">
.card {
  padding: 15px;
  border-bottom: 1px solid var(--gray-200);
}

.body {
  display: flex;
  align-items: center;
  justify-content: space-between;

  &__left {
    display: flex;
    align-items: center;
  }

  &__arrow {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 12px;
    height: 12px;
    background-color: var(--gray-100);
    border-radius: 50%;
    margin-right: 10px;
    transform: rotate(180deg);
    cursor: pointer;
    transition: transform 0.2s;
    color: var(--gray-300);

    &--rotated {
      transform: rotate(270deg);
    }
  }

  &__name {
    color: var(--gray-400);
  }

  &__actions {
    button:first-child {
      margin-right: 10px;
    }
  }
}

.children {
  &__add {
    margin-top: 15px;
  }
}

.child {
  display: flex;
  align-items: center;
  color: var(--gray-400);
  padding-left: 22px;

  &__icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 12px;
    height: 12px;
    background-color: var(--gray-100);
    cursor: pointer;
    border-radius: 50%;
    color: var(--gray-300);
    transition: color 0.2s;

    &:hover {
      color: var(--gray-400);
    }

    :deep(svg) {
      width: 8px;
      height: 8px;
    }
  }

  &__edit {
    margin: 0 8px 0 12px;
  }
}

.add {
  display: flex;
  align-items: center;
  padding-left: 22px;
  cursor: pointer;
  transition: color 0.2s;
  color: var(--gray-300);

  &:hover {
    color: var(--gray-400);
  }

  &__plus {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 12px;
    height: 12px;
    background-color: var(--gray-100);
    border-radius: 50%;
    margin-right: 12px;

    :deep(svg) {
      width: 12px;
      height: 12px;
    }
  }
}
</style>
