<script setup lang="ts">
interface Props {
  transitionDuration: string;
  transitionTimingFunction: "linear" | "ease" | "ease-in" | "ease-in-out" | "ease-out";
}

withDefaults(defineProps<Props>(), {
  transitionDuration: "200ms",
  transitionTimingFunction: "ease",
});

function beforeEnter(element) {
  requestAnimationFrame(() => {
    if (!element.style.height) {
      element.style.height = "0px";
    }

    element.style.display = null;
  });
}

function enter(element) {
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      element.style.height = `${element.scrollHeight}px`;
    });
  });
}

function afterEnter(element) {
  element.style.height = null;
}

function beforeLeave(element) {
  requestAnimationFrame(() => {
    if (!element.style.height) {
      element.style.height = `${element.offsetHeight}px`;
    }
  });
}

function leave(element) {
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      element.style.height = "0px";
    });
  });
}

function afterLeave(element) {
  element.style.height = null;
}
</script>

<template>
  <transition
    enter-active-class="enter-active"
    leave-active-class="leave-active"
    @before-enter="beforeEnter"
    @enter="enter"
    @after-enter="afterEnter"
    @before-leave="beforeLeave"
    @leave="leave"
    @after-leave="afterLeave"
  >
    <slot />
  </transition>
</template>

<style scoped lang="scss">
.enter-active,
.leave-active {
  overflow: hidden;
  transition-property: height;
  transition-duration: v-bind(transitionDuration);
  transition-timing-function: v-bind(transitionTimingFunction);
}
</style>
