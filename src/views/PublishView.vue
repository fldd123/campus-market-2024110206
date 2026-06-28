<script setup lang="ts"></script>

<template>
  <div class="page">
    <div class="form-card">
      <h1>发布闲置</h1>
      <p class="form-sub">填写商品信息，快速上架</p>

      <div class="upload-box">
        <span class="upload-icon">+</span>
        <span class="upload-text">上传图片</span>
      </div>

      <div class="form-group">
        <label>商品名称</label>
        <input class="input" placeholder="请输入商品名称" />
      </div>
      <div class="form-group">
        <label>分类</label>
        <select class="input"><option>请选择分类</option></select>
      </div>
      <div class="form-group">
        <label>价格（元）</label>
        <input class="input" type="number" placeholder="0.00" />
      </div>
      <div class="form-group">
        <label>成色</label>
        <div class="tag-group">
          <span class="tag" v-for="t in ['全新','99新','九成','七成','有瑕疵']" :key="t">{{ t }}</span>
        </div>
      </div>
      <div class="form-group">
        <label>商品描述</label>
        <textarea class="input textarea" placeholder="描述商品的使用情况、购买时间等…"></textarea>
      </div>
      <div class="form-group">
        <label>联系方式</label>
        <input class="input" placeholder="微信号 / 手机号" />
      </div>

      <button class="btn btn-primary btn-block">立即发布</button>
    </div>
  </div>
</template>

<style scoped>
.page { max-width: 560px; margin: 0 auto; padding-bottom: 40px; }
.form-card { background: #fff; border-radius: 16px; padding: 32px; box-shadow: 0 1px 3px rgba(0,0,0,.06); }
.form-card h1 { font-size: 22px; margin: 0 0 4px; color: #1a2332; }
.form-sub { font-size: 13px; color: #7a8a9e; margin: 0 0 24px; }
.upload-box {
  border: 2px dashed #d0d7de; border-radius: 12px; padding: 36px; text-align: center;
  cursor: pointer; transition: all 0.2s; margin-bottom: 20px;
}
.upload-box:hover { border-color: #2b7a4b; background: #f1faf3; }
.upload-icon { display: block; font-size: 28px; color: #2b7a4b; font-weight: 300; }
.upload-text { font-size: 13px; color: #7a8a9e; margin-top: 4px; display: block; }
.form-group { margin-bottom: 18px; }
.form-group label { display: block; font-size: 13px; font-weight: 600; color: #3d4a5c; margin-bottom: 6px; }
.input {
  width: 100%; padding: 10px 14px; border: 1px solid #d0d7de; border-radius: 8px;
  font-size: 13px; outline: none; box-sizing: border-box; transition: border 0.2s;
}
.input:focus { border-color: #2b7a4b; }
.textarea { min-height: 90px; resize: vertical; }
.tag-group { display: flex; gap: 8px; flex-wrap: wrap; }
.tag { font-size: 12px; padding: 6px 14px; border-radius: 6px; background: #f0f2f5; color: #3d4a5c; cursor: pointer; transition: all 0.2s; }
.tag:hover { background: #e8f5e9; color: #2b7a4b; }
.btn {
  padding: 10px 28px; border-radius: 8px; font-size: 14px;
  font-weight: 600; cursor: pointer; border: none; transition: all 0.2s;
}
.btn-primary { background: #2b7a4b; color: #fff; }
.btn-primary:hover { background: #1e5f38; }
.btn-block { width: 100%; padding: 12px; font-size: 15px; margin-top: 8px; }
</style>
