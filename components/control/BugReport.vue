<script setup lang="ts"></script>

<template>
  <a class="bug-report" href="https://github.com/gregor-tokarev/casher-admin/issues/new" target="_blank">
    <nuxt-icon name="bug"></nuxt-icon>
  </a>
</template>

<style scoped lang="scss">
.bug-report {
  position: fixed;
  right: 30px;
  bottom: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 65px;
  height: 65px;
  background-color: var(--accent);
  border-radius: 50%;
  cursor: pointer;
  transition: background-color 0.2s;
  color: var(--black);

  &:hover {
    background-color: var(--accent-hover);
  }

  :deep(.nuxt-icon svg) {
    height: 32px;
    width: 32px;
  }
}
</style>
