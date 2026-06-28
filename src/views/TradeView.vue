<script setup lang="ts">
import { ref } from 'vue'

const searchText = ref('')
const category = ref('')
const sortBy = ref('new')

const items = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  name: `闲置商品 ${i + 1}`,
  desc: '九成新，使用次数不多，功能完好',
  price: (i + 1) * 15 + 10,
  tag: ['数码', '教材', '生活', '服饰'][i % 4],
}))
</script>

<template>
  <div class="page">
    <div class="page-header">
      <h1>交易市场</h1>
      <div class="filters">
        <el-input v-model="searchText" placeholder="搜索商品..." prefix-icon="Search" class="search-input" />
        <el-select v-model="category" placeholder="全部分类" class="select">
          <el-option label="全部分类" value="" />
          <el-option label="数码" value="数码" />
          <el-option label="教材" value="教材" />
          <el-option label="生活" value="生活" />
          <el-option label="服饰" value="服饰" />
        </el-select>
        <el-select v-model="sortBy" placeholder="最新发布" class="select">
          <el-option label="最新发布" value="new" />
          <el-option label="价格最低" value="price" />
        </el-select>
      </div>
    </div>

    <div class="card-grid">
      <el-card v-for="item in items" :key="item.id" shadow="hover" class="card">
          <div class="card-img" />
          <div class="card-body">
            <h3>{{ item.name }}</h3>
            <p class="card-desc">{{ item.desc }}</p>
            <div class="card-footer">
              <span class="price">¥{{ item.price.toFixed(2) }}</span>
              <el-tag size="small" type="success">{{ item.tag }}</el-tag>
            </div>
          </div>
        </el-card>
    </div>

    <div class="pagination-wrap">
      <el-pagination background layout="prev, pager, next" :total="50" />
    </div>
  </div>
</template>

<style scoped>
.page { padding-bottom: 40px; }
.page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; flex-wrap: wrap; gap: 12px; }
.page-header h1 { font-size: 22px; color: #1a2332; margin: 0; }
.filters { display: flex; gap: 8px; flex-wrap: wrap; }
.search-input { width: 180px; }
.select { width: 130px; }
.card-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
.card-link { text-decoration: none; color: inherit; display: block; }
.card { border-radius: 12px; overflow: hidden; }
.card-img {
  height: 140px;
  background: linear-gradient(135deg, #e8f5e9, #c8e6c9);
  display: flex; align-items: center; justify-content: center;
}
.card-body { padding: 4px 0; }
.card-body h3 { font-size: 15px; margin: 0 0 6px; color: #1a2332; }
.card-desc { font-size: 12px; color: #7a8a9e; margin: 0 0 12px; line-height: 1.4; }
.card-footer { display: flex; justify-content: space-between; align-items: center; }
.price { font-size: 16px; font-weight: 700; color: #e65100; }
.pagination-wrap { display: flex; justify-content: center; margin-top: 32px; }
@media (max-width: 900px) { .card-grid { grid-template-columns: repeat(3, 1fr); } }
@media (max-width: 640px) { .card-grid { grid-template-columns: repeat(2, 1fr); } }
</style>
