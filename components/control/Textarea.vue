<script setup lang="ts">
interface Props {
  modelValue: string;
  error: boolean;
  placeholder: string;
}

withDefaults(defineProps<Props>(), { modelValue: "", error: false, placeholder: "" });

interface Emits {
  (e: "update:modelValue", value: string): void;
  (e: "enter", value: void): void;
  (e: "blur", value: InputEvent): void;
}

const emits = defineEmits<Emits>();

const control = ref(null);
function updateHeight() {
  const textarea = control.value as HTMLTextAreaElement;

  nextTick(() => {
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  });
}

onMounted(() => {
  updateHeight();
});

function onInput(event: KeyboardEvent): void {
  const textarea = event.currentTarget as HTMLTextAreaElement;

  emits("update:modelValue", textarea.value);

  updateHeight();
}
</script>

<template>
  <div class="textarea" :class="{ 'textarea--error': error }">
    <div class="textarea__left-icon textarea__icon">
      <slot name="left-icon"></slot>
    </div>
    <textarea
      ref="control"
      class="textarea__control headline-medium"
      rows="1"
      :placeholder="placeholder"
      :value="modelValue"
      @input="onInput"
    ></textarea>
    <div class="textarea__left-icon textarea__icon">
      <slot name="right-icon"></slot>
    </div>
  </div>
</template>

<style scoped lang="scss">
.textarea {
  display: flex;
  align-items: flex-start;
  padding: 10px 15px;
  background-color: var(--gray-100);
  border-radius: 10px;
  border: 1px solid var(--gray-100);

  &--error {
    border-color: var(--error);
    color: var(--error);
  }

  &__control {
    width: 100%;
    background-color: transparent;
    border: none;
    outline: none;
    color: inherit;
    resize: none;

    &::placeholder {
      color: var(--gray-300);
    }
  }

  &__icon {
    &:not(:empty) {
      :deep(svg) {
        width: 24px;
        height: 24px;
      }
    }
  }

  &__left-icon {
    &:not(:empty) {
      margin-right: 10px;
    }
  }

  &__right-icon {
    &:not(:empty) {
      margin-left: 10px;
    }
  }
}
</style>
