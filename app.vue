<template>
  <div>
    <LayoutAuthHeader></LayoutAuthHeader>
    <OauthVk></OauthVk>
    <ControlsBugReport></ControlsBugReport>
    <ControlsPagination
      v-model="pValue"
      :items-count="500"
      :page-size="11"
      :max-display-count="10"
    ></ControlsPagination>
  </div>
</template>

<script setup lang="ts">
const pValue = ref(3);
</script>

<style lang="scss"></style>
