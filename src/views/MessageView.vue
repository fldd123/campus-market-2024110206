<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { getMessages, type MessageItem } from '../api/message'
import EmptyState from '../components/EmptyState.vue'

const messages = ref<MessageItem[]>([])
const loading = ref(true)

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
    messages.value = []
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div class="page">
    <div class="page-header">
      <h1>消息</h1>
      <span v-if="messages.filter(m => m.unread).length" class="badge">
        {{ messages.filter(m => m.unread).length }} 条未读
      </span>
    </div>

    <EmptyState v-if="!loading && !messages.length" text="暂无消息" />

    <div v-else class="msg-list">
      <div v-for="item in messages" :key="item.id" class="msg-item" :class="{ unread: item.unread }">
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
.msg-item.unread { background: #f0f9ff; }
.msg-avatar {
  width: 44px; height: 44px; border-radius: 50%; flex-shrink: 0;
  background: linear-gradient(135deg, #c8e6c9, #81c784);
  display: flex; align-items: center; justify-content: center;
  color: #fff; font-weight: 700; font-size: 16px;
}
.msg-body { flex: 1; min-width: 0; }
.msg-top { display: flex; justify-content: space-between; margin-bottom: 4px; }
.msg-name { font-size: 14px; font-weight: 600; color: #1a2332; }
.msg-time { font-size: 12px; color: #9aa8b9; }
.msg-text { font-size: 13px; color: #5f6b7a; margin: 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.unread-dot { font-size: 11px; color: #d32f2f; font-weight: 600; margin-top: 4px; display: inline-block; }
</style>
