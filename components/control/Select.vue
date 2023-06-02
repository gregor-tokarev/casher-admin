<script setup lang="ts">
import { onClickOutside } from "@vueuse/core";

interface Props {
  modelValue: string;
  error: boolean;
  options: { id: string; value: string; label: string }[];
  placeholder: string;
  size: "small" | "big";
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: "",
  error: false,
  options: () => [],
  placeholder: "",
  size: "small",
});

interface Emits {
  (e: "update:modelValue", value: string): void;
}

const emits = defineEmits<Emits>();

const open = ref(false);

const currentOption = computed(() => props.options.find((o) => o.value === props.modelValue));

function onSelect(optionId: string): void {
  const option = props.options.find((o) => o.id === optionId);
  emits("update:modelValue", option.value);

  open.value = false;
}

const root = ref(null);

onClickOutside(root, () => {
  open.value = false;
});
</script>

<template>
  <div ref="root" class="select">
    <div class="select__body body" :class="{ 'body--big': size === 'big', 'body--error': error }" @click="open = !open">
      <span class="body__text" :class="{ 'body__text--placeholder': !modelValue }">
        <template v-if="currentOption">{{ currentOption.label }}</template>
        <template v-else>{{ placeholder }}</template>
      </span>
      <nuxt-icon class="body__arrow" :class="{ 'body__arrow--rotated': open }" name="arrow"></nuxt-icon>
    </div>
    <AnimationCollapse>
      <ul v-if="open" class="select__options">
        <li
          v-for="option in options"
          :key="option.id"
          class="option"
          :class="{ 'option--big': size === 'big' }"
          @click="onSelect(option.id)"
        >
          {{ option.label }}
        </li>
      </ul>
    </AnimationCollapse>
  </div>
</template>

<style scoped lang="scss">
@use "assets/styles/typography";

.select {
  position: relative;
  background-color: var(--gray-100);
  border-radius: 10px;

  &__body {
    padding: 5px 10px;
  }

  &__options {
    position: absolute;
    right: 0;
    left: 0;
    z-index: 100;
    transform: translateY(5px);
    background-color: var(--gray-100);
    border-radius: 10px;
    padding: 10px 0;
  }
}

.body {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 10px;

  &--big {
    padding: 10px 15px;

    .body__arrow {
      :deep(svg) {
        width: 38px;
        height: 38px;
      }
    }
  }

  &--error {
    border: 1px solid var(--error);

    .body__text {
      color: var(--error);
    }
  }

  .body__text {
    &:not(.body__text--placeholder) {
      color: var(--gray-400);
    }

    @include typography.headline-medium;
  }

  &__arrow {
    transform: rotate(-90deg);
    transition: transform 0.2s;
    color: var(--gray-400);

    &--rotated {
      transform: rotate(90deg);
    }

    :deep(svg) {
      width: 16px;
      height: 16px;
    }
  }

  &__text {
    color: var(--gray-400);

    @include typography.label-medium;

    &--placeholder {
      color: var(--gray-300);
      user-select: none;
    }
  }
}

.option {
  padding: 2px 15px;
  cursor: pointer;
  color: var(--gray-400);

  @include typography.label-medium;

  &--big {
    @include typography.headline-medium;
  }

  &:hover {
    background-color: var(--gray-200);
  }
}
</style>
