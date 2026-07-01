<template>
  <section class="page">
    <div class="profile-card">
      <div class="avatar">
        <UserFilled aria-hidden="true" style="width:24px;height:16px" />
      </div>

      <div>
        <h1>{{ userStore.displayName }}</h1>
        <p>{{ userStore.userDescription }}</p>
        <p>{{ userStore.currentUser.bio }}</p>
      </div>
    </div>

    <div v-if="loading" class="loading">加载中...</div>

    <div class="panel">
      <h2><Star aria-hidden="true" style="color:#f59e0b;width:14px;height:14px;flex-shrink:0" /> 我的收藏</h2>

      <EmptyState
        v-if="favoriteStore.favorites.length === 0"
        text="暂无收藏内容"
      />

      <div v-else class="favorite-list">
        <ItemCard
          v-for="item in favoriteStore.favorites"
          :key="`${item.type}-${item.id}`"
          :title="item.title"
          :description="item.description"
          :tag="getTypeLabel(item.type)"
          :location="item.location"
        >
          <template #footer>
            <button class="remove-btn" @click="favoriteStore.removeFavorite(item.type, item.id)">
              取消收藏
            </button>
          </template>
        </ItemCard>
      </div>
    </div>

    <div class="panel">
      <h2><Document aria-hidden="true" style="color:#059669;width:14px;height:14px;flex-shrink:0" /> 我的发布 ({{ myPublishes.length }})</h2>

      <EmptyState
        v-if="myPublishes.length === 0"
        text="暂无发布内容"
      />

      <div v-else class="favorite-list">
        <ItemCard
          v-for="item in myPublishes"
          :key="`${item.type}-${item.id}`"
          :title="item.title"
          :description="item.description"
          :tag="getTypeLabel(item.type)"
          :location="item.location"
          :time="item.time"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import EmptyState from '../components/EmptyState.vue'
import ItemCard from '../components/ItemCard.vue'
import { useFavoriteStore } from '../stores/favorite'
import { useUserStore } from '../stores/user'
import { getTrades, type TradeItem } from '../api/trade'
import { getLostFounds, type LostFoundItem } from '../api/lostFound'
import { getGroupBuys, type GroupBuyItem } from '../api/groupBuy'
import { getErrands, type ErrandItem } from '../api/errand'

interface MyPublishItem {
  id: number | undefined
  type: 'trade' | 'lostFound' | 'groupBuy' | 'errand'
  title: string
  description: string
  location: string
  time: string
}

const userStore = useUserStore()
const favoriteStore = useFavoriteStore()

const trades = ref<TradeItem[]>([])
const lostFounds = ref<LostFoundItem[]>([])
const groupBuys = ref<GroupBuyItem[]>([])
const errands = ref<ErrandItem[]>([])
const loading = ref(true)

onMounted(async () => {
  try {
    const [tRes, lRes, gRes, eRes] = await Promise.all([
      getTrades(),
      getLostFounds(),
      getGroupBuys(),
      getErrands(),
    ])
    trades.value = tRes.data
    lostFounds.value = lRes.data
    groupBuys.value = gRes.data
    errands.value = eRes.data
  } catch {
    // 数据加载失败时保持空数组
  } finally {
    loading.value = false
  }
})

const myTrades = computed(() =>
  trades.value.filter((item) => item.publisher === userStore.displayName),
)

const myLostFounds = computed(() =>
  lostFounds.value.filter((item) => item.publisher === userStore.displayName),
)

const myGroupBuys = computed(() =>
  groupBuys.value.filter((item) => item.publisher === userStore.displayName),
)

const myErrands = computed(() =>
  errands.value.filter((item) => item.publisher === userStore.displayName),
)

const myPublishes = computed<MyPublishItem[]>(() => [
  ...myTrades.value.map((item) => ({
    id: item.id,
    type: 'trade' as const,
    title: item.title,
    description: item.description,
    location: item.location,
    time: item.publishTime,
  })),
  ...myLostFounds.value.map((item) => ({
    id: item.id,
    type: 'lostFound' as const,
    title: item.title,
    description: item.description,
    location: item.location,
    time: item.eventTime,
  })),
  ...myGroupBuys.value.map((item) => ({
    id: item.id,
    type: 'groupBuy' as const,
    title: item.title,
    description: item.description,
    location: item.location,
    time: item.deadline,
  })),
  ...myErrands.value.map((item) => ({
    id: item.id,
    type: 'errand' as const,
    title: item.title,
    description: item.description,
    location: `${item.from} → ${item.to}`,
    time: item.deadline,
  })),
])

function getTypeLabel(type: string) {
  const map: Record<string, string> = {
    trade: '二手交易',
    lostFound: '失物招领',
    groupBuy: '拼单搭子',
    errand: '跑腿委托',
  }

  return map[type] || '校园信息'
}
</script>

<style scoped>
.page {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.profile-card,
.panel {
  padding: 24px;
  border-radius: 16px;
  background: #fff;
}

.profile-card {
  display: flex;
  align-items: center;
  gap: 20px;
  background: linear-gradient(135deg, #ecfdf5, #fff);
  border-left: 4px solid #059669;
}

.panel {
  border-left: 4px solid #059669;
}

.avatar {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  background: #ecfdf5;
  color: #059669;
}

.profile-card h1,
.panel h2 {
  margin: 0 0 8px;
  display: flex;
  align-items: center;
  gap: 6px;
}

.profile-card p,
.hint {
  margin: 0;
  color: #6b7280;
  line-height: 1.6;
}

.favorite-list {
  display: grid;
  gap: 16px;
}

.remove-btn {
  border: none;
  border-radius: 999px;
  padding: 6px 12px;
  cursor: pointer;
  background: #fce4ec;
  color: #e91e63;
}
</style>
