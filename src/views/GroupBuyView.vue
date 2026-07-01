<template>
  <section class="page">
    <div class="page-header">
      <div class="page-header__title">
        <Connection aria-hidden="true" style="color:#7c3aed;width:14px;height:14px;flex-shrink:0;display:block" />
        <h1>拼单搭子</h1>
      </div>
      <p>找搭子一起拼单，省钱又省心。</p>
    </div>

    <div v-if="error" class="error">{{ error }}</div>

    <div v-if="loading" class="loading">加载中...</div>

    <EmptyState v-else-if="!error && !groupBuys.length" text="暂无拼单" />

    <div v-else-if="groupBuys.length" class="list">
      <ItemCard
        v-for="item in groupBuys"
        :key="item.id"
        :title="item.title"
        :description="item.description"
        :tag="item.type"
        :location="item.location"
        :time="item.deadline"
        color="purple"
      >
        <template #footer>
          <div class="count-bar">
            <span class="count-label">{{ item.currentCount }}/{{ item.targetCount }} 人</span>
            <div class="bar-track">
              <div class="bar-fill" :style="{ width: Math.min(100, (item.currentCount / item.targetCount) * 100) + '%' }"></div>
            </div>
          </div>
        </template>
      </ItemCard>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import ItemCard from '../components/ItemCard.vue'
import EmptyState from '../components/EmptyState.vue'
import { getGroupBuys, type GroupBuyItem } from '../api/groupBuy'

const groupBuys = ref<GroupBuyItem[]>([])
const loading = ref(true)
const error = ref('')

onMounted(async () => {
  try {
    const res = await getGroupBuys()
    groupBuys.value = res.data
  } catch {
    error.value = '数据加载失败，请确保后端服务已启动（npm run mock）'
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
  background: linear-gradient(135deg, #f5f3ff, #fff);
  border-left: 4px solid #7c3aed;
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
  color: #6d28d9;
}

.page-header p {
  margin: 0;
  color: #6b7280;
}

.list {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
}

.count-bar {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.count-label {
  color: #2563eb;
  font-weight: 600;
  font-size: 13px;
}

.bar-track {
  height: 6px;
  background: #e5e7eb;
  border-radius: 3px;
  overflow: hidden;
}

.bar-fill {
  height: 100%;
  background: #7c3aed;
  border-radius: 3px;
  transition: width 0.4s ease;
}
.error {
  background: #ffebee; color: #c62828; padding: 12px 20px; border-radius: 10px; text-align: center; font-size: 14px;
}
</style>
