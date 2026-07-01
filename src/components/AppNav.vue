<template>
  <nav class="app-nav">
    <RouterLink to="/">
      <HomeFilled aria-hidden="true" /><span>首页</span>
    </RouterLink>
    <RouterLink to="/trade">
      <Goods aria-hidden="true" /><span>二手交易</span>
    </RouterLink>
    <RouterLink to="/lost-found">
      <WarningFilled aria-hidden="true" /><span>失物招领</span>
    </RouterLink>
    <RouterLink to="/group-buy">
      <Connection aria-hidden="true" /><span>拼单搭子</span>
    </RouterLink>
    <RouterLink to="/errand">
      <Van aria-hidden="true" /><span>跑腿委托</span>
    </RouterLink>
    <RouterLink to="/publish">
      <Edit aria-hidden="true" /><span>发布</span>
    </RouterLink>
    <RouterLink to="/message">
      <ChatDotSquare aria-hidden="true" /><span>消息</span>
    </RouterLink>
    <RouterLink to="/user">
      <User aria-hidden="true" /><span>我的</span>
    </RouterLink>
  </nav>
</template>

<style scoped>
.app-nav {
  display: flex;
  gap: 16px;
  align-items: center;
}

.app-nav a {
  color: #4b5563;
  text-decoration: none;
  font-size: 15px;
  min-height: 44px;
  padding: 8px 4px;
  border-bottom: 2px solid transparent;
  transition: color 0.2s, border-color 0.2s;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  white-space: nowrap;
}

.app-nav a svg {
  width: 16px;
  height: 16px;
}

.app-nav a:hover {
  color: #1f2937;
}

.app-nav a.router-link-active,
.app-nav a.router-link-exact-active {
  color: #059669;
  font-weight: 600;
  border-bottom-color: #059669;
}
</style>
