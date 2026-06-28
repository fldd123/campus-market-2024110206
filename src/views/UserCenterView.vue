<script setup lang="ts"></script>

<template>
  <div class="page">
    <div class="profile-header">
      <div class="profile-avatar"></div>
      <h2>张同学</h2>
      <p class="profile-meta">信息科学与工程学院 · 大三</p>
      <div class="profile-stats">
        <div><span>12</span>发布</div>
        <div><span>8</span>成交</div>
        <div><span>5.0</span>评分</div>
      </div>
    </div>

    <div class="menu-group">
      <div class="menu-item">
        <span class="menu-icon">📋</span>
        <span>我的发布</span>
        <span class="menu-arrow">›</span>
      </div>
      <div class="menu-item">
        <span class="menu-icon">❤️</span>
        <span>我的收藏</span>
        <span class="menu-arrow">›</span>
      </div>
      <div class="menu-item">
        <span class="menu-icon">💬</span>
        <span>交易记录</span>
        <span class="menu-arrow">›</span>
      </div>
      <div class="menu-item">
        <span class="menu-icon">⚙️</span>
        <span>账号设置</span>
        <span class="menu-arrow">›</span>
      </div>
      <div class="menu-item">
        <span class="menu-icon">ℹ️</span>
        <span>关于我们</span>
        <span class="menu-arrow">›</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page { max-width: 560px; margin: 0 auto; padding-bottom: 40px; }
.profile-header {
  text-align: center; padding: 32px 20px; background: #fff; border-radius: 16px;
  margin-bottom: 16px; box-shadow: 0 1px 3px rgba(0,0,0,.06);
}
.profile-avatar {
  width: 72px; height: 72px; border-radius: 50%; margin: 0 auto 12px;
  background: linear-gradient(135deg, #66bb6a, #2b7a4b);
}
.profile-header h2 { font-size: 20px; margin: 0 0 4px; color: #1a2332; }
.profile-meta { font-size: 13px; color: #7a8a9e; margin: 0 0 16px; }
.profile-stats { display: flex; justify-content: center; gap: 32px; }
.profile-stats div { text-align: center; font-size: 12px; color: #7a8a9e; }
.profile-stats span { display: block; font-size: 20px; font-weight: 700; color: #2b7a4b; }
.menu-group { background: #fff; border-radius: 16px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,.06); }
.menu-item {
  display: flex; align-items: center; gap: 12px; padding: 16px 20px;
  font-size: 14px; color: #2c3e50; cursor: pointer; transition: background 0.2s;
}
.menu-item:hover { background: #f5f7fa; }
.menu-item + .menu-item { border-top: 1px solid #f0f2f5; }
.menu-icon { font-size: 18px; }
.menu-arrow { margin-left: auto; color: #bcc6d4; font-size: 18px; }
</style>
