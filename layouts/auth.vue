<script setup lang="ts"></script>

<template>
  <div class="auth-layout">
    <LayoutAuthHeader class="auth-layout__header"></LayoutAuthHeader>
    <slot></slot>
    <ControlBugReport></ControlBugReport>
  </div>
</template>

<style scoped lang="scss">
.auth-layout {
  height: 100vh;
  background-color: var(--background);
}
</style>
