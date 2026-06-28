<script setup lang="ts"></script>

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

    <section class="stats-row">
      <div class="stat-card">
        <span class="stat-num">128</span>
        <span class="stat-label">在售商品</span>
      </div>
      <div class="stat-card">
        <span class="stat-num">56</span>
        <span class="stat-label">今日新增</span>
      </div>
      <div class="stat-card">
        <span class="stat-num">1.2k</span>
        <span class="stat-label">注册用户</span>
      </div>
      <div class="stat-card">
        <span class="stat-num">98%</span>
        <span class="stat-label">满意率</span>
      </div>
    </section>

    <section class="categories">
      <h2>分类浏览</h2>
      <div class="cat-grid">
        <div class="cat-item">📚 教材</div>
        <div class="cat-item">💻 数码</div>
        <div class="cat-item">👔 服饰</div>
        <div class="cat-item">🛋 生活</div>
        <div class="cat-item">🎮 娱乐</div>
        <div class="cat-item">🏫 校园服务</div>
      </div>
    </section>
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
.btn-primary { background: #2b7a4b; color: #fff; }
.btn-primary:hover { background: #1e5f38; }
.btn-outline { border: 2px solid #2b7a4b; color: #2b7a4b; }
.btn-outline:hover { background: #2b7a4b; color: #fff; }
.stats-row {
  display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 28px;
}
.stat-card {
  background: #fff; border-radius: 12px; padding: 20px; text-align: center;
  box-shadow: 0 1px 3px rgba(0,0,0,.06);
}
.stat-num { display: block; font-size: 24px; font-weight: 700; color: #2b7a4b; }
.stat-label { font-size: 13px; color: #7a8a9e; margin-top: 4px; }
.categories h2 { font-size: 18px; margin: 0 0 16px; color: #2c3e50; }
.cat-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
.cat-item {
  background: #fff; border-radius: 10px; padding: 20px; text-align: center;
  font-size: 14px; color: #2c3e50; cursor: pointer; transition: all 0.2s;
  box-shadow: 0 1px 3px rgba(0,0,0,.06);
}
.cat-item:hover { transform: translateY(-2px); box-shadow: 0 4px 12px rgba(0,0,0,.1); }
@media (max-width: 640px) {
  .stats-row { grid-template-columns: repeat(2, 1fr); }
  .cat-grid { grid-template-columns: repeat(2, 1fr); }
  .hero { padding: 40px 16px 32px; }
}
</style>
