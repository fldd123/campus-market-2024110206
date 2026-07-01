<template>
  <section class="page">
    <div class="page-header">
      <div class="page-header__title">
        <Goods aria-hidden="true" style="color:#2563eb;width:14px;height:14px;flex-shrink:0;display:block" />
        <h1>二手交易</h1>
      </div>
      <p>浏览同学发布的闲置物品，发现校园内的实用好物。</p>
    </div>

    <div v-if="error" class="error">{{ error }}</div>

    <div v-if="loading" class="loading">加载中...</div>

    <EmptyState v-else-if="!error && !trades.length" text="暂无商品" />

    <div v-else-if="trades.length" class="list">
      <ItemCard
        v-for="item in trades"
        :key="item.id"
        :title="item.title"
        :description="item.description"
        :tag="item.category"
        :location="item.location"
        :time="item.publishTime"
        color="blue"
      >
        <template #footer>
          <strong>￥{{ item.price }}</strong>
          <span class="condition">{{ item.condition }}</span>

          <button
            class="favorite-btn"
            :class="{ active: favoriteStore.isFavorite('trade', item.id!) }"
            @click="favoriteStore.toggleFavorite({
            id: item.id!,
            type: 'trade',
            title: item.title,
            description: item.description,
            location: item.location
          })">
            {{ favoriteStore.isFavorite('trade', item.id!) ? '已收藏' : '收藏' }}
          </button>
        </template>
      </ItemCard>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import ItemCard from '../components/ItemCard.vue'
import EmptyState from '../components/EmptyState.vue'
import { getTrades, type TradeItem } from '../api/trade'
import { useFavoriteStore } from '../stores/favorite'

const favoriteStore = useFavoriteStore()

const trades = ref<TradeItem[]>([])
const loading = ref(true)
const error = ref('')

onMounted(async () => {
  try {
    const res = await getTrades()
    trades.value = res.data
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
  background: linear-gradient(135deg, #eff6ff, #fff);
  border-left: 4px solid #2563eb;
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
  color: #1e40af;
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

.condition {
  margin-left: 12px;
  color: #6b7280;
}
.error {
  background: #ffebee; color: #c62828; padding: 12px 20px; border-radius: 10px; text-align: center; font-size: 14px;
}
.favorite-btn {
  margin-left: 12px;
  border: none;
  border-radius: 999px;
  padding: 6px 12px;
  cursor: pointer;
  background: #f3f4f6;
  color: #374151;
  transition: background 0.2s, color 0.2s;
}

.favorite-btn.active {
  background: #fce4ec;
  color: #e91e63;
}
</style>
