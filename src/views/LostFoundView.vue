<script setup lang="ts">
import { ref, computed } from 'vue'
const tab = ref('lost')
const lostItems = Array.from({ length: 6 }, (_, i) => ({
  id: i + 1,
  title: i % 2 === 0 ? '失物招领' : '寻物启事',
  name: i % 2 === 0 ? `蓝色水杯` : `黑色钱包`,
  desc: i % 2 === 0 ? '在二教203拾到，请失主联系' : '在食堂丢失，内有校园卡',
  location: ['二教', '食堂', '图书馆', '操场'][i % 4],
  date: '2026-06-2' + (7 - i),
  contact: '张同学 138****1234',
}))
const filteredItems = computed(() => {
  return lostItems.filter(item =>
    tab.value === 'lost' ? item.title === '失物招领' : item.title === '寻物启事'
  )
})
</script>

<template>
  <div class="page">
    <div class="page-header">
      <h1>失物招领</h1>
      <el-radio-group v-model="tab" class="tab-group">
        <el-radio-button value="lost">招领</el-radio-button>
        <el-radio-button value="found">寻物</el-radio-button>
      </el-radio-group>
    </div>

    <div class="list">
      <el-card v-for="item in filteredItems" :key="item.id" shadow="hover" class="lost-card">
        <div class="lost-body">
          <el-tag :type="item.title === '失物招领' ? 'success' : 'warning'" size="small" effect="dark">
            {{ item.title }}
          </el-tag>
          <h3>{{ item.name }}</h3>
          <p class="lost-desc">{{ item.desc }}</p>
          <div class="lost-meta">
            <span>📍 {{ item.location }}</span>
            <span>🕐 {{ item.date }}</span>
          </div>
          <p class="lost-contact">{{ item.contact }}</p>
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
.lost-card { border-radius: 12px; }
.lost-body h3 { font-size: 16px; margin: 8px 0 4px; color: #1a2332; }
.lost-desc { font-size: 13px; color: #3d4a5c; margin: 0 0 8px; }
.lost-meta { display: flex; gap: 16px; font-size: 12px; color: #7a8a9e; margin-bottom: 6px; }
.lost-contact { font-size: 12px; color: #2b7a4b; margin: 0; }
</style>
