<script setup lang="ts"></script>

<template>
  <div class="auth">
    <LayoutAuthHeader class="auth__header"></LayoutAuthHeader>
    <slot></slot>
    <ControlBugReport></ControlBugReport>
  </div>
</template>

<style scoped lang="scss">
.auth {
  height: 100vh;
  background-color: var(--background);
}
</style>
