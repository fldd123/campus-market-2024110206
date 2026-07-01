<template>
  <section class="page">
    <div class="page-header">
      <div class="page-header__title">
        <WarningFilled aria-hidden="true" style="color:#f59e0b;width:14px;height:14px;flex-shrink:0;display:block" />
        <h1>失物招领</h1>
      </div>
      <p>发布和查看校园内的失物与招领信息，互帮互助。</p>
    </div>

    <div v-if="error" class="error">{{ error }}</div>

    <div v-if="loading" class="loading">加载中...</div>

    <EmptyState v-else-if="!error && !lostFounds.length" text="暂无失物招领信息" />

    <div v-else-if="lostFounds.length" class="list">
      <ItemCard
        v-for="item in lostFounds"
        :key="item.id"
        :title="item.title"
        :description="item.description"
        :tag="item.type === 'lost' ? '寻物' : '招领'"
        :location="item.location"
        :time="item.eventTime"
        color="amber"
      >
        <template #footer>
          <a :href="'tel:' + item.contact" class="contact">{{ item.contact }}</a>
        </template>
      </ItemCard>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import ItemCard from '../components/ItemCard.vue'
import EmptyState from '../components/EmptyState.vue'
import { getLostFounds, type LostFoundItem } from '../api/lostFound'

const lostFounds = ref<LostFoundItem[]>([])
const loading = ref(true)
const error = ref('')

onMounted(async () => {
  try {
    const res = await getLostFounds()
    lostFounds.value = res.data
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
  background: linear-gradient(135deg, #fffbeb, #fff);
  border-left: 4px solid #f59e0b;
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
  color: #b45309;
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

.contact {
  color: #2563eb;
  font-size: 13px;
  text-decoration: none;
  font-weight: 500;
}

.contact:hover {
  text-decoration: underline;
}
.error {
  background: #ffebee; color: #c62828; padding: 12px 20px; border-radius: 10px; text-align: center; font-size: 14px;
}
</style>
