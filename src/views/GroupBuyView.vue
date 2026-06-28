<script setup lang="ts">
const groups = Array.from({ length: 8 }, (_, i) => ({
  id: i + 1,
  name: `拼团商品 ${i + 1}`,
  desc: '满5人成团，享超低折扣价',
  price: (i + 1) * 10 + 5,
  original: (i + 1) * 20 + 30,
  joined: 3 + (i % 3),
  needed: 5,
  tag: ['零食', '日用品', '水果', '文具'][i % 4],
}))
</script>

<template>
  <div class="page">
    <div class="page-header">
      <h1>校园团购</h1>
      <el-tag type="success" effect="plain">火热拼团中</el-tag>
    </div>

    <div class="grid">
      <el-card v-for="g in groups" :key="g.id" shadow="hover" class="group-card">
        <div class="group-img" />
        <div class="group-body">
          <h3>{{ g.name }}</h3>
          <p class="group-desc">{{ g.desc }}</p>
          <div class="group-price">
            <span class="price">¥{{ g.price }}</span>
            <span class="original">¥{{ g.original }}</span>
          </div>
          <div class="group-progress">
            <el-progress :percentage="Math.round(g.joined / g.needed * 100)" :stroke-width="8" />
            <span class="group-count">{{ g.joined }}/{{ g.needed }}人</span>
          </div>
          <el-tag size="small" type="warning">{{ g.tag }}</el-tag>
          <el-button type="primary" size="small" round class="join-btn">去拼单</el-button>
        </div>
      </el-card>
    </div>
  </div>
</template>

<style scoped>
.page { padding-bottom: 40px; }
.page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }
.page-header h1 { font-size: 22px; color: #1a2332; margin: 0; }
.grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
.group-card { border-radius: 12px; overflow: hidden; }
.group-img {
  height: 120px;
  background: linear-gradient(135deg, #fff8e1, #ffcc80);
}
.group-body { padding: 4px 0; position: relative; }
.group-body h3 { font-size: 15px; margin: 0 0 4px; color: #1a2332; }
.group-desc { font-size: 12px; color: #7a8a9e; margin: 0 0 8px; }
.group-price { display: flex; align-items: baseline; gap: 6px; margin-bottom: 8px; }
.price { font-size: 18px; font-weight: 700; color: #e65100; }
.original { font-size: 12px; color: #9aa8b9; text-decoration: line-through; }
.group-progress { display: flex; align-items: center; gap: 8px; margin-bottom: 8px; }
.group-progress .el-progress { flex: 1; }
.group-count { font-size: 11px; color: #7a8a9e; white-space: nowrap; }
.join-btn { margin-top: 8px; width: 100%; }
@media (max-width: 900px) { .grid { grid-template-columns: repeat(3, 1fr); } }
@media (max-width: 640px) { .grid { grid-template-columns: repeat(2, 1fr); } }
</style>
