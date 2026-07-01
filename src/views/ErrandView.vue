<template>
  <section class="page">
    <div class="page-header">
      <div class="page-header__title">
        <Van aria-hidden="true" style="color:#0d9488;width:14px;height:14px;flex-shrink:0;display:block" />
        <h1>跑腿委托</h1>
      </div>
      <p>发布或接单跑腿任务，互帮互助便利校园生活。</p>
    </div>

    <div v-if="error" class="error">{{ error }}</div>

    <div v-if="loading" class="loading">加载中...</div>

    <EmptyState v-else-if="!error && !errands.length" text="暂无跑腿任务" />

    <div v-else-if="errands.length" class="list">
      <ItemCard
        v-for="item in errands"
        :key="item.id"
        :title="item.title"
        :description="item.description"
        :tag="item.taskType"
        :location="`${item.from} → ${item.to}`"
        :time="item.deadline"
        color="teal"
      >
        <template #footer>
          <strong>￥{{ item.reward }}</strong>
          <span class="publisher">{{ item.publisher }}</span>
        </template>
      </ItemCard>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import ItemCard from '../components/ItemCard.vue'
import EmptyState from '../components/EmptyState.vue'
import { getErrands, type ErrandItem } from '../api/errand'

const errands = ref<ErrandItem[]>([])
const loading = ref(true)
const error = ref('')

onMounted(async () => {
  try {
    const res = await getErrands()
    errands.value = res.data
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
  background: linear-gradient(135deg, #f0fdfa, #fff);
  border-left: 4px solid #0d9488;
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
  color: #0f766e;
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

.publisher {
  margin-left: 12px;
  color: #6b7280;
  font-size: 13px;
}
.error {
  background: #ffebee; color: #c62828; padding: 12px 20px; border-radius: 10px; text-align: center; font-size: 14px;
}
</style>
