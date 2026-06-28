<script setup lang="ts">
const errands = Array.from({ length: 8 }, (_, i) => ({
  id: i + 1,
  title: ['取快递', '买午饭', '打印资料', '送钥匙'][i % 4],
  desc: '帮忙送到宿舍楼下，谢谢',
  reward: (i + 1) * 2 + 3,
  status: i % 3 === 0 ? '进行中' : '待接单',
  location: ['菜鸟驿站', '二食堂', '打印店', '图书馆'][i % 4],
  publisher: '李同学',
}))
</script>

<template>
  <div class="page">
    <div class="page-header">
      <h1>校园跑腿</h1>
      <el-button type="primary" round>发布跑腿</el-button>
    </div>

    <div class="list">
      <el-card v-for="e in errands" :key="e.id" shadow="hover" class="errand-card">
        <div class="errand-header">
          <h3>{{ e.title }}</h3>
          <el-tag :type="e.status === '待接单' ? 'warning' : 'primary'" size="small" effect="dark">
            {{ e.status }}
          </el-tag>
        </div>
        <p class="errand-desc">{{ e.desc }}</p>
        <div class="errand-meta">
          <span>📍 {{ e.location }}</span>
          <span>👤 {{ e.publisher }}</span>
        </div>
        <div class="errand-footer">
          <span class="reward">¥{{ e.reward }}</span>
          <el-button type="success" size="small" round :disabled="e.status !== '待接单'">接单</el-button>
        </div>
      </el-card>
    </div>
  </div>
</template>

<style scoped>
.page { max-width: 640px; margin: 0 auto; padding-bottom: 40px; }
.page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }
.page-header h1 { font-size: 22px; color: #1a2332; margin: 0; }
.list { display: flex; flex-direction: column; gap: 12px; }
.errand-card { border-radius: 12px; }
.errand-header { display: flex; justify-content: space-between; align-items: center; }
.errand-header h3 { font-size: 16px; margin: 0; color: #1a2332; }
.errand-desc { font-size: 13px; color: #3d4a5c; margin: 8px 0; }
.errand-meta { display: flex; gap: 16px; font-size: 12px; color: #7a8a9e; margin-bottom: 10px; }
.errand-footer { display: flex; justify-content: space-between; align-items: center; }
.reward { font-size: 18px; font-weight: 700; color: #e65100; }
</style>
