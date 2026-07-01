<template>
  <section class="page">
    <div class="page-header">
      <div class="page-header__title">
        <ChatDotSquare aria-hidden="true" style="color:#6366f1;width:14px;height:14px;flex-shrink:0;display:block" />
        <h1>消息中心</h1>
      </div>
      <p>查看系统通知、收藏提醒和互动消息。</p>
    </div>

    <div v-if="loading" class="loading">加载中...</div>

    <div v-else-if="error" class="error">{{ error }}</div>

    <template v-else>
      <div class="msg-list">
        <div
          v-for="item in messages"
          :key="item.id"
          class="msg-item"
          :class="{ unread: item.unread }"
        >
          <div class="msg-avatar">{{ item.sender.charAt(0) }}</div>
          <div class="msg-body">
            <div class="msg-top">
              <span class="msg-name">{{ item.sender }}</span>
              <span class="msg-time">{{ formatTime(item.time) }}</span>
            </div>
            <p class="msg-text">{{ item.content }}</p>
            <span v-if="item.unread" class="unread-dot">未读</span>
          </div>
        </div>
      </div>

      <div class="sys-msg">
        <h3>系统通知</h3>
        <article class="msg-card">
          <h4>欢迎使用校园轻集市</h4>
          <p>你可以在这里发布二手商品、失物招领、拼单搭子和跑腿委托。</p>
        </article>
        <article class="msg-card">
          <h4>功能提示</h4>
          <p>收藏的信息可以在个人中心中查看。</p>
        </article>
      </div>
    </template>
  </section>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { getMessages, type MessageItem } from '../api/message'

const messages = ref<MessageItem[]>([])
const loading = ref(true)
const error = ref('')

function formatTime(iso: string): string {
  const date = new Date(iso)
  const now = new Date()
  const diff = Math.floor((now.getTime() - date.getTime()) / 1000)
  if (diff < 60) return '刚刚'
  if (diff < 3600) return `${Math.floor(diff / 60)}分钟前`
  if (diff < 86400) return `${Math.floor(diff / 3600)}小时前`
  return `${date.getMonth() + 1}/${date.getDate()}`
}

onMounted(async () => {
  try {
    const res = await getMessages()
    messages.value = res.data
  } catch {
    error.value = '消息加载失败'
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.page {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.page-header {
  padding: 24px;
  border-radius: 16px;
  background: linear-gradient(135deg, #eef2ff, #fff);
  border-left: 4px solid #6366f1;
}

.page-header__title {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 8px;
  line-height: 1;
}

.page-header__title h1 {
  margin: 0;
  color: #4338ca;
}

.page-header p {
  margin: 0;
  color: #6b7280;
}

.loading,
.error {
  padding: 20px;
  text-align: center;
  border-radius: 12px;
  background: #fff;
  color: #6b7280;
}

.error {
  background: #ffebee;
  color: #c62828;
}

.msg-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.msg-item {
  display: flex;
  gap: 14px;
  padding: 16px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0,0,0,.04);
}

.msg-item.unread {
  background: #f0f9ff;
}

.msg-avatar {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  flex-shrink: 0;
  background: linear-gradient(135deg, #c8e6c9, #81c784);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-weight: 700;
  font-size: 16px;
}

.msg-body {
  flex: 1;
  min-width: 0;
}

.msg-top {
  display: flex;
  justify-content: space-between;
  margin-bottom: 4px;
}

.msg-name {
  font-size: 14px;
  font-weight: 600;
  color: #1a2332;
}

.msg-time {
  font-size: 12px;
  color: #9aa8b9;
}

.msg-text {
  font-size: 13px;
  color: #5f6b7a;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.unread-dot {
  font-size: 11px;
  color: #d32f2f;
  font-weight: 600;
  margin-top: 4px;
  display: inline-block;
}

.sys-msg {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.sys-msg h3 {
  margin: 0;
  font-size: 15px;
  color: #6b7280;
}

.msg-card {
  padding: 20px;
  border-radius: 12px;
  background: #fff;
  border: 1px solid #e5e7eb;
}

.msg-card h4 {
  margin: 0 0 8px;
  font-size: 15px;
  color: #1a2332;
}

.msg-card p {
  margin: 0;
  color: #6b7280;
  line-height: 1.6;
}
</style>
