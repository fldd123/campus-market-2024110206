<template>
  <article class="item-card" :class="color ? `card--${color}` : ''">
    <div class="item-card__header">
      <h3>{{ title }}</h3>
      <span v-if="tag" class="tag" :class="color ? `tag--${color}` : ''">{{ tag }}</span>
    </div>

    <p class="description">{{ description }}</p>

    <div class="meta">
      <span v-if="location">地点：{{ location }}</span>
      <span v-if="time">时间：{{ time }}</span>
    </div>

    <div v-if="$slots.footer" class="footer">
      <slot name="footer" />
    </div>
  </article>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  description: string
  tag?: string
  location?: string
  time?: string
  color?: 'blue' | 'amber' | 'purple' | 'teal' | 'pink' | 'emerald' | 'green'
}>()
</script>

<style scoped>
.item-card {
  padding: 18px;
  border-radius: 12px;
  background: #fff;
  border: 1px solid #e5e7eb;
  transition: transform 0.2s, box-shadow 0.2s;
  cursor: pointer;
}

.item-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

.item-card__header {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  align-items: center;
}

.item-card h3 {
  margin: 0;
  font-size: 18px;
}

.tag {
  padding: 4px 8px;
  border-radius: 999px;
  background: #eff6ff;
  color: #2563eb;
  font-size: 12px;
}

.description {
  margin: 12px 0;
  color: #4b5563;
  line-height: 1.6;
}

.meta {
  display: flex;
  gap: 16px;
  color: #6b7280;
  font-size: 13px;
}

.footer {
  margin-top: 12px;
}

.card--blue { border-left: 4px solid #2563eb; }
.card--amber { border-left: 4px solid #f59e0b; }
.card--purple { border-left: 4px solid #7c3aed; }
.card--teal { border-left: 4px solid #0d9488; }
.card--pink { border-left: 4px solid #db2777; }
.card--emerald { border-left: 4px solid #059669; }
.card--green { border-left: 4px solid #059669; }

.tag--blue { background: #eff6ff; color: #2563eb; }
.tag--amber { background: #fffbeb; color: #d97706; }
.tag--purple { background: #f5f3ff; color: #7c3aed; }
.tag--teal { background: #f0fdfa; color: #0d9488; }
.tag--pink { background: #fdf2f8; color: #db2777; }
.tag--emerald { background: #ecfdf5; color: #059669; }
.tag--green { background: #e8f5e9; color: #059669; }
</style>
