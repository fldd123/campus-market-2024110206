<template>
  <section class="page">
    <div class="page-header">
      <h1>拼单搭子</h1>
      <p>找搭子一起拼单，省钱又省心。</p>
    </div>

    <div v-if="error" class="error">{{ error }}</div>

    <EmptyState v-if="!loading && !error && !groupBuys.length" text="暂无拼单" />

    <div v-else-if="groupBuys.length" class="list">
      <ItemCard
        v-for="item in groupBuys"
        :key="item.id"
        :title="item.title"
        :description="item.description"
        :tag="item.type"
        :location="item.location"
        :time="item.deadline"
      >
        <template #footer>
          <span class="count">{{ item.currentCount }}/{{ item.targetCount }} 人</span>
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
  background: #fff;
}

.page-header h1 {
  margin: 0 0 8px;
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

.count {
  color: #2563eb;
  font-weight: 600;
  font-size: 13px;
}
.error {
  background: #ffebee; color: #c62828; padding: 12px 20px; border-radius: 10px; text-align: center; font-size: 14px;
}
</style>
