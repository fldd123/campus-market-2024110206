Day3 Evidence — Mock 数据建模与列表渲染

1. 今日完成内容

今日完成了校园集市四个业务模块的 **Mock 数据** 建模、API 接口封装和页面列表渲染。具体包括：

- **db.json**：为二手交易、失物招领、拼单搭子、跑腿委托四类业务设计了 20 条 **Mock 数据**
- **JSON Server** 配置：在 `package.json` 中添加了 `"mock": "json-server --watch db.json --port 3001"` 脚本
- **API 模块**：创建了 `http.ts`（Axios 实例）、`trade.ts`、`lostFound.ts`、`groupBuy.ts`、`errand.ts`，分别导出对应的 TS 接口和方法
- **通用组件**：创建了 `ItemCard.vue`（卡片组件，含 title/description/tag/location/time 属性及 footer 插槽）和 `EmptyState.vue`（空状态提示组件）
- **页面列表渲染**：将 TradeView、LostFoundView、GroupBuyView、ErrandView 四个视图从静态假数据改为从 API 请求数据并渲染卡片列表

2. Mock 数据结构说明

| 数据集合 | 对应业务 | 主要字段 | 页面用途 |
|---|---|---|---|
| trades | 二手交易 | title、price、category、condition、location、publisher、publishTime、status、description | 展示二手商品列表，按分类筛选 |
| lostFounds | 失物招领 | title、type、itemName、location、eventTime、contact、status、description | 展示失物和招领信息，按 type 区分 |
| groupBuys | 拼单搭子 | title、type、targetCount、currentCount、deadline、location、publisher、status、description | 展示拼单信息，显示人数进度 |
| errands | 跑腿委托 | title、taskType、reward、from、to、deadline、publisher、status、description | 展示跑腿任务，显示起止地点和报酬 |

```json
// trades 数据示例
{ "id": 1, "title": "高等数学（第七版）", "category": "教材", "price": 25,
  "condition": "九成新", "location": "二教", "publisher": "张学长",
  "publishTime": "2026-06-28", "status": "在售",
  "description": "九成新，笔记完整，期末复习利器" }
```

3. 我的设计

- 为什么二手交易需要 price 和 condition
price（价格）是交易最核心的信息，用户在浏览时最关注的就是价格，没有价格字段就失去了交易的前提。condition（成色）让买家对商品新旧程度有直观判断，避免因为"看着新买来发现旧"产生矛盾，对于学生群体来说，二手商品的成色是决定是否购买的关键因素。

- 为什么失物招领需要 type 字段
type 区分"lost（寻物）"和"found（招领）"两种类型。一开始我考虑用两个独立集合，后来觉得放在同一集合中统一管理更方便，用 type 字段来区分即可。这样在一个页面中可以通过筛选切换展示两类信息，也方便后续做匹配推荐。

- 为什么拼单搭子需要 targetCount 和 currentCount
targetCount 是成团目标人数，currentCount 是当前已参团人数。拼单的本质是凑够一定人数才能享受优惠，展示人数进度可以直观反映拼单的热度和紧迫感。设计时特意保留了两个独立的整数字段而不是计算字段，这样前后端职责分明，也方便在卡片中展示进度条效果。

- 为什么跑腿委托需要 from、to 和 reward
跑腿任务的核心要素是"从哪里送到哪里"以及"报酬"。from 和 to 分开设计，比合并为一个 location 字段更清晰，方便后续做路线规划和价格估算。reward（报酬）是跑腿业务的经济驱动，没有报酬字段学生就没有接单动力。另外设计了 taskType 字段区分是代取快递、代购还是其他跑腿类型。

4. AI 设计

AI 辅助生成了以下内容：

- **db.json**：AI 根据我提供的页面 UI 结构反推了数据模型，生成了四个集合的初始 **Mock 数据**，每条数据都包含符合校园场景的示例值，数据风格统一且贴近真实校园生活
- **API 模块**：AI 生成了 `http.ts` 的 Axios 实例（baseURL、超时、拦截器），以及四个业务模块的接口文件，每个文件包含完整的 TypeScript 接口定义和请求函数
- **通用组件**：AI 生成了 `ItemCard.vue` 和 `EmptyState.vue`，其中 ItemCard 包含 header（标题+标签）、description、meta（地点+时间）和 footer 插槽四部分结构
- **页面渲染代码**：AI 生成了四个视图页面的 `onMounted` 请求逻辑和 `v-for` 列表渲染模板

AI 生成内容中不合理之处：
1. 第一版 `http.ts` 的响应拦截器直接返回 `res.data`，导致视图代码中 `res.data` 取不到数据，因为拦截器已经把数据解包了一层
2. 第一版 `ItemCard.vue` 的 props 设计为 `name/desc/price/tag`，与失物招领、跑腿等业务的字段语义不完全匹配（失物招领不需要 price，需要 contact）
3. 第一版数据字段（name/desc/original/joined/tag）与视图需要的字段（title/description/type/targetCount/currentCount）不一致

5. 最终调整

我做了以下手动修改：

1. **删除并重构了 ItemCard 组件**：将 props 从 `{ name, desc, price, tag }` 改为 `{ title, description, tag, location, time }`，并增加了 footer 插槽，使其适配所有业务场景的展示需求
2. **修改了 db.json 的字段结构**：将 `trades` 的字段从 `{ name, desc, tag }` 改为 `{ title, category, condition, publisher, publishTime, status, description }`；将 `lostFounds` 的字段改为包含 `type`、`eventTime`、`contact` 的新结构
3. **调整了 API 接口定义**：删除了原来多余的搜索/排序参数，统一为简洁的 `getTrades()` 等无参数调用，符合当前阶段「先跑通」的需求
4. **修复了 http.ts 的拦截器**：将 `res => res.data` 改为 `res => res`，确保视图中的 `res.data` 能正确获取数据
5. **补充了 HomeView 和 MessageView**：首页从 API 实时拉取数据计算统计数字，消息页也从硬编码改为 API 驱动

6. 遇到的问题与解决方法

**问题**：页面启动后没有渲染数据，控制台显示 `undefined`。

**排查过程**：打开浏览器检查 Network 面板，发现 API 请求成功返回了 JSON 数据。再检查 Vue DevTools，发现 `trades` 数组为空。逐步追踪代码发现 `http.ts` 中有一行拦截器代码 `(res) => res.data`，这个拦截器在 Axios 响应返回时直接把 `res.data` 作为结果传出。因此 `getTrades()` 返回的已经是 `data` 数组本身，但在视图代码中我又写了一次 `trades.value = res.data`（期望 res 是 Axios 响应对象），此时 `res` 已是数组，`res.data` 自然为 `undefined`。

**解决方法**：将 `http.ts` 拦截器的返回值从 `res.data` 改为 `res`，保持返回完整的 Axios 响应对象，让视图统一使用 `res.data` 的写法。

这个问题的根源是前后约定不一致：拦截器做了自动解包，但视图代码不知道这个约定。后续开发中应该在团队内统一 API 响应的使用规范，或者在拦截器设计时就考虑好消费者是如何调用的。

7. 今日反思

**Mock 数据** 建模是前端开发的基石，在项目初期后端接口尚未就绪时，**JSON Server** 配合 **Mock 数据**可以让我们独立完成页面开发，极大提升效率。通过今天的工作，我体会到好的数据模型设计必须同时考虑业务语义和渲染需求：字段太少页面展示空洞，字段太多则徒增维护成本。接口封装让视图代码与数据源解耦，后续只需切换 baseURL 即可对接真实后端。**列表渲染**是从数据到 UI 的关键环节，使用通用组件可以避免重复代码、保持风格统一。今天我遇到的问题（拦截器解包导致数据无法渲染）虽然是细小的代码错误，但反映了前后端数据流转规范的重要性——模块之间需要明确的契约约定，否则小问题会浪费大量排查时间。。
