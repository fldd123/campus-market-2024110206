<script setup lang="ts">
const names = ['李同学', '王学长', '陈学姐', '刘同学', '赵学长', '孙学姐'] as const
</script>

<template>
  <div class="page">
    <div class="page-header">
      <h1>消息</h1>
      <span class="badge">3 条未读</span>
    </div>

    <div class="msg-list">
      <div class="msg-item" v-for="i in 6" :key="i">
        <div class="msg-avatar"></div>
        <div class="msg-body">
          <div class="msg-top">
            <span class="msg-name">{{ names[i - 1] }}</span>
            <span class="msg-time">{{ i }}分钟前</span>
          </div>
          <p class="msg-text">你好，请问这件商品还在吗？诚心想要</p>
          <span v-if="i <= 2" class="unread-dot">未读</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page { max-width: 640px; margin: 0 auto; padding-bottom: 40px; }
.page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
.page-header h1 { font-size: 22px; margin: 0; color: #1a2332; }
.badge { font-size: 12px; background: #ffebee; color: #d32f2f; padding: 4px 12px; border-radius: 12px; font-weight: 600; }
.msg-list { display: flex; flex-direction: column; gap: 2px; }
.msg-item {
  display: flex; gap: 14px; padding: 16px; background: #fff; border-radius: 12px;
  transition: all 0.2s; cursor: pointer; box-shadow: 0 1px 3px rgba(0,0,0,.04);
}
.msg-item:hover { background: #f8fafc; }
.msg-item + .msg-item { margin-top: 8px; }
.msg-avatar {
  width: 44px; height: 44px; border-radius: 50%; flex-shrink: 0;
  background: linear-gradient(135deg, #c8e6c9, #81c784);
}
.msg-body { flex: 1; min-width: 0; }
.msg-top { display: flex; justify-content: space-between; margin-bottom: 4px; }
.msg-name { font-size: 14px; font-weight: 600; color: #1a2332; }
.msg-time { font-size: 12px; color: #9aa8b9; }
.msg-text { font-size: 13px; color: #5f6b7a; margin: 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.unread-dot { font-size: 11px; color: #d32f2f; font-weight: 600; margin-top: 4px; display: inline-block; }
</style>
