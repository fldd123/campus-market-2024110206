<template>
  <AppLayout />
</template>

<script setup lang="ts">
import AppLayout from './components/AppLayout.vue'
</script>

<style>
*,
*::before,
*::after {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'PingFang SC', 'Microsoft YaHei', 'Helvetica Neue', Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

:focus-visible {
  outline: 2px solid #059669;
  outline-offset: 2px;
}

.loading {
  padding: 40px 20px;
  text-align: center;
  background: #fff;
  border-radius: 12px;
  color: #6b7280;
  font-size: 14px;
}
</style>
