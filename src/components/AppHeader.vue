<template>
  <header class="app-header">
    <div class="brand">
      <School aria-hidden="true" style="color:#059669;width:18px;height:18px;flex-shrink:0;display:block" />
      <span class="logo">校园轻集市</span>
    </div>

    <AppNav />

    <div class="user-mini">
      <span>{{ userStore.displayName }}</span>
    </div>
  </header>
</template>

<script setup lang="ts">
import AppNav from './AppNav.vue'
import { useUserStore } from '../stores/user'

const userStore = useUserStore()
</script>

<style scoped>
.app-header {
  height: 64px;
  padding: 0 32px;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: linear-gradient(135deg, #f0fdf4, #fff);
}

.brand {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
}

.logo {
  font-size: 20px;
  font-weight: 700;
  line-height: 1;
}

.user-mini {
  font-size: 14px;
  color: #374151;
}
</style>
