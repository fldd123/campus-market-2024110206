<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { getTrades, type TradeItem } from '../api/trade'
import { getLostFounds, type LostFoundItem } from '../api/lostFound'
import { getGroupBuys, type GroupBuyItem } from '../api/groupBuy'
import { getErrands, type ErrandItem } from '../api/errand'
import ItemCard from '../components/ItemCard.vue'
import EmptyState from '../components/EmptyState.vue'

const router = useRouter()

const trades = ref<TradeItem[]>([])
const lostFounds = ref<LostFoundItem[]>([])
const groupBuys = ref<GroupBuyItem[]>([])
const errands = ref<ErrandItem[]>([])

const today = '2026-06-29'

const stats = ref({ totalTrades: 0, todayNew: 0, totalUsers: 0, satisfaction: 0 })
const latestTrades = ref<TradeItem[]>([])
const loading = ref(true)
const error = ref('')

onMounted(async () => {
  try {
    const [tradesRes, lostRes, groupRes, errandRes] = await Promise.all([
      getTrades(),
      getLostFounds(),
      getGroupBuys(),
      getErrands(),
    ])

    trades.value = tradesRes.data
    lostFounds.value = lostRes.data
    groupBuys.value = groupRes.data
    errands.value = errandRes.data

    const todayNew = trades.value.filter((t) => t.publishTime === today).length

    stats.value = {
      totalTrades: trades.value.length,
      todayNew,
      totalUsers: 1280,
      satisfaction: 98,
    }

    latestTrades.value = trades.value.slice(0, 4)
  } catch {
    error.value = '数据加载失败，请确保后端服务已启动（npm run mock）'
  } finally {
    loading.value = false
  }
})

const categories = [
  { name: '教材', icon: '📚', route: '/trade', query: { category: '教材' } },
  { name: '数码', icon: '💻', route: '/trade', query: { category: '数码' } },
  { name: '服饰', icon: '👔', route: '/trade', query: { category: '服饰' } },
  { name: '生活', icon: '🛋', route: '/trade', query: { category: '生活' } },
  { name: '娱乐', icon: '🎮', route: '/trade', query: { category: '娱乐' } },
  { name: '校园服务', icon: '🏫', route: '/errand', query: {} },
]

function goCategory(cat: (typeof categories)[0]) {
  router.push({ path: cat.route, query: cat.query })
}

function goTrade(item: TradeItem) {
  router.push({ path: '/trade', query: { category: item.category } })
}
</script>

<template>
  <div class="page">
    <section class="hero">
      <h1>校园轻集市</h1>
      <p>闲置流转 · 知识共享 · 让校园生活更简单</p>
      <div class="hero-actions">
        <router-link to="/trade" class="btn btn-primary">逛逛集市</router-link>
        <router-link to="/publish" class="btn btn-outline">发布闲置</router-link>
      </div>
    </section>

    <div v-if="error" class="error-banner">{{ error }}</div>

    <div v-if="loading" class="loading">加载中...</div>

    <template v-if="!loading">
    <section class="stats-row">
      <div class="stat-card">
        <span class="stat-num">{{ stats.totalTrades }}</span>
        <span class="stat-label">在售商品</span>
      </div>
      <div class="stat-card">
        <span class="stat-num">{{ stats.todayNew }}</span>
        <span class="stat-label">今日新增</span>
      </div>
      <div class="stat-card">
        <span class="stat-num">{{ stats.totalUsers > 999 ? (stats.totalUsers / 1000).toFixed(1) + 'k' : stats.totalUsers }}</span>
        <span class="stat-label">注册用户</span>
      </div>
      <div class="stat-card">
        <span class="stat-num">{{ stats.satisfaction }}%</span>
        <span class="stat-label">满意率</span>
      </div>
    </section>

    <section class="categories">
      <h2>分类浏览</h2>
      <div class="cat-grid">
        <div
          v-for="cat in categories"
          :key="cat.name"
          class="cat-item"
          tabindex="0"
          role="button"
          @click="goCategory(cat)"
          @keydown.enter="goCategory(cat)"
          @keydown.space.prevent="goCategory(cat)"
        >
          <span class="cat-icon">{{ cat.icon }}</span>
          <span class="cat-name">{{ cat.name }}</span>
        </div>
      </div>
    </section>

    <section class="latest">
      <h2>最新商品</h2>
      <EmptyState v-if="!loading && !latestTrades.length" text="暂无商品数据" />
      <div v-else class="latest-grid">
        <div
          v-for="item in latestTrades"
          :key="item.id"
          class="latest-item"
          tabindex="0"
          role="button"
          @click="goTrade(item)"
          @keydown.enter="goTrade(item)"
          @keydown.space.prevent="goTrade(item)"
        >
          <ItemCard
            :title="item.title"
            :description="item.description"
            :tag="item.category"
            :location="item.location"
            :time="item.publishTime"
            color="green"
          >
            <template #footer>
              <strong>￥{{ item.price }}</strong>
              <span class="condition">{{ item.condition }}</span>
            </template>
          </ItemCard>
        </div>
      </div>
    </section>
    </template>
  </div>
</template>

<style scoped>
.page { padding-bottom: 40px; }
.hero {
  text-align: center;
  padding: 60px 20px 48px;
  background: linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%);
  border-radius: 16px;
  margin-bottom: 28px;
}
.hero h1 { font-size: 32px; color: #1b5e20; margin: 0 0 8px; }
.hero p { font-size: 15px; color: #4e8c5a; margin: 0 0 24px; }
.hero-actions { display: flex; gap: 12px; justify-content: center; }
.btn {
  padding: 10px 28px; border-radius: 8px; font-size: 14px;
  text-decoration: none; font-weight: 600; transition: all 0.2s;
}
.btn-primary { background: #059669; color: #fff; }
.btn-primary:hover { background: #047857; }
.btn-outline { border: 2px solid #059669; color: #059669; }
.btn-outline:hover { background: #059669; color: #fff; }
.stats-row {
  display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 28px;
}
.stat-card {
  background: #fff; border-radius: 12px; padding: 20px; text-align: center;
  box-shadow: 0 1px 3px rgba(0,0,0,.06);
}
.stat-num { display: block; font-size: 24px; font-weight: 700; color: #059669; }
.stat-label { font-size: 13px; color: #7a8a9e; margin-top: 4px; }
.error-banner {
  background: #ffebee; color: #c62828; padding: 12px 20px; border-radius: 10px;
  margin-bottom: 20px; font-size: 14px; text-align: center;
}
.categories h2,
.latest h2 { font-size: 18px; margin: 0 0 16px; color: #2c3e50; }
.cat-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-bottom: 28px; }
.cat-item {
  background: #fff; border-radius: 10px; padding: 20px; text-align: center;
  font-size: 14px; color: #2c3e50; cursor: pointer; transition: all 0.2s;
  box-shadow: 0 1px 3px rgba(0,0,0,.06);
  display: flex; flex-direction: column; align-items: center; gap: 6px;
}
.cat-item:hover { transform: translateY(-2px); box-shadow: 0 4px 12px rgba(0,0,0,.1); }
.cat-icon { font-size: 24px; }
.cat-name { font-size: 14px; }
.latest-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
.latest-item { cursor: pointer; transition: transform 0.2s; }
.latest-item:hover { transform: translateY(-2px); }
.condition { margin-left: 12px; color: #6b7280; }
@media (max-width: 900px) {
  .latest-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 640px) {
  .stats-row { grid-template-columns: repeat(2, 1fr); }
  .cat-grid { grid-template-columns: repeat(2, 1fr); }
  .hero { padding: 40px 16px 32px; }
  .latest-grid { grid-template-columns: 1fr; }
}
</style>
