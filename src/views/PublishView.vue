<template>
  <section class="page">
    <div class="page-header">
      <h1>发布信息</h1>
      <p>选择发布类型，填写必要信息，让校园需求更快被看见。</p>
    </div>

    <form class="publish-form" @submit.prevent="handleSubmit">
      <FormField label="发布类型" required>
        <select v-model="publishType">
          <option value="trade">二手交易</option>
          <option value="lostFound">失物招领</option>
          <option value="groupBuy">拼单搭子</option>
          <option value="errand">跑腿委托</option>
        </select>
      </FormField>

      <FormField label="标题" required :error="errors.title">
        <input v-model.trim="form.title" type="text" placeholder="请输入标题" />
      </FormField>

      <FormField label="地点" required :error="errors.location">
        <input v-model.trim="form.location" type="text" placeholder="请输入地点" />
      </FormField>

      <FormField label="描述" required :error="errors.description">
        <textarea v-model.trim="form.description" rows="5" placeholder="请简要描述具体情况"></textarea>
      </FormField>

      <template v-if="publishType === 'trade'">
        <FormField label="商品分类" required :error="errors.category">
          <input v-model.trim="form.category" type="text" placeholder="如：数码配件、教材资料、生活用品" />
        </FormField>

        <FormField label="价格" required :error="errors.price">
          <input v-model.number="form.price" type="number" min="0" placeholder="请输入价格" />
        </FormField>

        <FormField label="成色" required :error="errors.condition">
          <select v-model="form.condition">
            <option value="">请选择成色</option>
            <option value="全新">全新</option>
            <option value="九成新">九成新</option>
            <option value="八成新">八成新</option>
            <option value="正常使用痕迹">正常使用痕迹</option>
          </select>
        </FormField>
      </template>

      <template v-if="publishType === 'lostFound'">
        <FormField label="信息类型" required>
          <select v-model="form.lostFoundType">
            <option value="lost">寻物</option>
            <option value="found">招领</option>
          </select>
        </FormField>

        <FormField label="物品名称" required :error="errors.itemName">
          <input v-model.trim="form.itemName" type="text" placeholder="请输入物品名称" />
        </FormField>

        <FormField label="发生时间" required :error="errors.eventTime">
          <input v-model="form.eventTime" type="datetime-local" />
        </FormField>

        <FormField label="联系方式" required :error="errors.contact">
          <input v-model.trim="form.contact" type="text" placeholder="请输入手机号 / QQ / 微信" />
        </FormField>
      </template>

      <template v-if="publishType === 'groupBuy'">
        <FormField label="拼单类型" required :error="errors.groupType">
          <input v-model.trim="form.groupType" type="text" placeholder="如：拼餐、资料团购、运动搭子" />
        </FormField>

        <FormField label="目标人数" required :error="errors.targetCount">
          <input v-model.number="form.targetCount" type="number" min="2" placeholder="请输入目标人数" />
        </FormField>

        <FormField label="截止时间" required :error="errors.deadline">
          <input v-model="form.deadline" type="datetime-local" />
        </FormField>
      </template>

      <template v-if="publishType === 'errand'">
        <FormField label="任务类型" required :error="errors.taskType">
          <input v-model.trim="form.taskType" type="text" placeholder="如：取快递、代买、代送" />
        </FormField>

        <FormField label="酬劳" required :error="errors.reward">
          <input v-model.number="form.reward" type="number" min="0" placeholder="请输入酬劳" />
        </FormField>

        <FormField label="取件地点" required :error="errors.from">
          <input v-model.trim="form.from" type="text" placeholder="请输入取件地点" />
        </FormField>

        <FormField label="送达地点" required :error="errors.to">
          <input v-model.trim="form.to" type="text" placeholder="请输入送达地点" />
        </FormField>

        <FormField label="截止时间" required :error="errors.deadline">
          <input v-model="form.deadline" type="datetime-local" />
        </FormField>
      </template>

      <div class="actions">
        <button type="button" class="secondary" @click="resetForm">重置</button>
        <button type="submit" class="primary" :disabled="submitting">
          {{ submitting ? '提交中...' : '发布' }}
        </button>
      </div>
    </form>
  </section>
</template>

<script setup lang="ts">
import { reactive, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

import FormField from '../components/FormField.vue'
import { createTrade } from '../api/trade'
import { createLostFound } from '../api/lostFound'
import { createGroupBuy } from '../api/groupBuy'
import { createErrand } from '../api/errand'

type PublishType = 'trade' | 'lostFound' | 'groupBuy' | 'errand'

const router = useRouter()
const publishType = ref<PublishType>('trade')
const submitting = ref(false)

watch(publishType, () => {
  resetForm()
})

const form = reactive({
  title: '',
  location: '',
  description: '',
  category: '',
  price: 0,
  condition: '',
  lostFoundType: 'lost',
  itemName: '',
  eventTime: '',
  groupType: '',
  targetCount: 2,
  deadline: '',
  taskType: '',
  reward: 0,
  from: '',
  to: '',
  contact: ''
})

const errors = reactive<Record<string, string>>({})

function clearErrors() {
  Object.keys(errors).forEach((key) => {
    errors[key] = ''
  })
}

function validateLength(val: string, min: number, max: number) {
  const len = val.trim().length
  return len >= min && len <= max
}

function isValidContact(val: string) {
  const phone = /^1[3-9]\d{9}$/
  const qq = /^[1-9]\d{4,9}$/
  const wechat = /^[a-zA-Z][a-zA-Z0-9_-]{5,19}$/
  return phone.test(val) || qq.test(val) || wechat.test(val)
}

function isFutureTime(val: string) {
  return new Date(val) > new Date()
}

function isPastOrNow(val: string) {
  return new Date(val) <= new Date()
}

function validateForm() {
  clearErrors()

  if (!form.title) {
    errors.title = '请输入标题'
  } else if (!validateLength(form.title, 2, 50)) {
    errors.title = '标题长度应在 2~50 个字符之间'
  }

  if (!form.location) {
    errors.location = '请输入地点'
  } else if (!validateLength(form.location, 2, 50)) {
    errors.location = '地点至少输入 2 个字符'
  }

  if (!form.description) {
    errors.description = '请输入描述'
  } else if (!validateLength(form.description, 10, 500)) {
    errors.description = '描述至少输入 10 个字符'
  }

  if (publishType.value === 'trade') {
    if (!form.category) {
      errors.category = '请输入商品分类'
    } else if (!validateLength(form.category, 2, 20)) {
      errors.category = '商品分类至少输入 2 个字符'
    }
    if (isNaN(form.price) || form.price <= 0) {
      errors.price = '价格应大于 0'
    } else if (form.price > 99999.99) {
      errors.price = '价格不能超过 99999.99'
    } else if (!/^\d+(\.\d{1,2})?$/.test(String(form.price))) {
      errors.price = '价格最多保留两位小数'
    }
    if (!form.condition) {
      errors.condition = '请选择商品成色'
    }
  }

  if (publishType.value === 'lostFound') {
    if (!form.itemName) {
      errors.itemName = '请输入物品名称'
    } else if (!validateLength(form.itemName, 2, 50)) {
      errors.itemName = '物品名称至少输入 2 个字符'
    }
    if (!form.eventTime) {
      errors.eventTime = '请选择发生时间'
    } else if (!isPastOrNow(form.eventTime)) {
      errors.eventTime = '发生时间不能晚于当前时间'
    }
    if (!form.contact) {
      errors.contact = '请输入联系方式'
    } else if (!isValidContact(form.contact)) {
      errors.contact = '请输入有效的手机号/QQ/微信号'
    }
  }

  if (publishType.value === 'groupBuy') {
    if (!form.groupType) {
      errors.groupType = '请输入拼单类型'
    } else if (!validateLength(form.groupType, 2, 30)) {
      errors.groupType = '拼单类型至少输入 2 个字符'
    }
    if (form.targetCount < 2) {
      errors.targetCount = '目标人数不能少于 2 人'
    } else if (form.targetCount > 100) {
      errors.targetCount = '目标人数不能超过 100 人'
    }
    if (!form.deadline) {
      errors.deadline = '请选择截止时间'
    } else if (!isFutureTime(form.deadline)) {
      errors.deadline = '截止时间必须晚于当前时间'
    }
  }

  if (publishType.value === 'errand') {
    if (!form.taskType) {
      errors.taskType = '请输入任务类型'
    } else if (!validateLength(form.taskType, 2, 30)) {
      errors.taskType = '任务类型至少输入 2 个字符'
    }
    if (isNaN(form.reward) || form.reward < 0) {
      errors.reward = '酬劳不能为负数'
    } else if (form.reward > 9999) {
      errors.reward = '酬劳不能超过 9999'
    }
    if (!form.from) {
      errors.from = '请输入取件地点'
    } else if (!validateLength(form.from, 2, 50)) {
      errors.from = '取件地点至少输入 2 个字符'
    }
    if (!form.to) {
      errors.to = '请输入送达地点'
    } else if (!validateLength(form.to, 2, 50)) {
      errors.to = '送达地点至少输入 2 个字符'
    }
    if (!form.deadline) {
      errors.deadline = '请选择截止时间'
    } else if (!isFutureTime(form.deadline)) {
      errors.deadline = '截止时间必须晚于当前时间'
    }
  }

  return Object.values(errors).every((message) => !message)
}

function resetForm() {
  form.title = ''
  form.location = ''
  form.description = ''
  form.category = ''
  form.price = 0
  form.condition = ''
  form.lostFoundType = 'lost'
  form.itemName = ''
  form.eventTime = ''
  form.groupType = ''
  form.targetCount = 2
  form.deadline = ''
  form.taskType = ''
  form.reward = 0
  form.from = ''
  form.to = ''
  form.contact = ''

  clearErrors()
}

function getCurrentTime() {
  const now = new Date()
  return now.toISOString().slice(0, 16).replace('T', ' ')
}

async function handleSubmit() {
  if (!validateForm()) {
    return
  }

  submitting.value = true

  try {
    if (publishType.value === 'trade') {
      await createTrade({
        title: form.title,
        category: form.category,
        price: form.price,
        condition: form.condition,
        location: form.location,
        publisher: '当前用户',
        publishTime: getCurrentTime(),
        image: '',
        status: '在售',
        description: form.description,
      })

      ElMessage.success('二手商品发布成功')
      router.push('/trade')
    }

    if (publishType.value === 'lostFound') {
      await createLostFound({
        title: form.title,
        type: form.lostFoundType as 'lost' | 'found',
        itemName: form.itemName,
        location: form.location,
        eventTime: form.eventTime,
        contact: form.contact,
        status: form.lostFoundType === 'lost' ? '寻找中' : '待认领',
        description: form.description,
      })

      ElMessage.success('失物招领信息发布成功')
      router.push('/lost-found')
    }

    if (publishType.value === 'groupBuy') {
      await createGroupBuy({
        title: form.title,
        type: form.groupType,
        targetCount: form.targetCount,
        currentCount: 1,
        deadline: form.deadline,
        location: form.location,
        publisher: '当前用户',
        status: '拼团中',
        description: form.description,
      })

      ElMessage.success('拼单搭子信息发布成功')
      router.push('/group-buy')
    }

    if (publishType.value === 'errand') {
      await createErrand({
        title: form.title,
        taskType: form.taskType,
        reward: form.reward,
        from: form.from,
        to: form.to,
        deadline: form.deadline,
        publisher: '当前用户',
        status: '待接单',
        description: form.description,
      })

      ElMessage.success('跑腿委托发布成功')
      router.push('/errand')
    }
  } catch {
    ElMessage.error('发布失败，请检查 Mock 服务是否正常运行')
  } finally {
    submitting.value = false
  }
}
</script>

<style scoped>
.page {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.page-header {
  padding: 24px;
  border-radius: 16px;
  background: #fff;
}

.page-header h1 {
  margin: 0 0 8px;
}

.page-header p {
  margin: 0;
  color: #6b7280;
}

.publish-form {
  display: grid;
  gap: 18px;
  padding: 24px;
  border-radius: 16px;
  background: #fff;
}

input,
select,
textarea {
  width: 100%;
  box-sizing: border-box;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  padding: 10px 12px;
  font-size: 14px;
}

textarea {
  resize: vertical;
}

.actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

button {
  border: none;
  border-radius: 8px;
  padding: 10px 18px;
  cursor: pointer;
}

button:disabled {
  cursor: not-allowed;
  opacity: 0.7;
}

.primary {
  background: #2563eb;
  color: #fff;
}

.secondary {
  background: #f3f4f6;
  color: #374151;
}
</style>
