Day5 Evidence - 状态管理与用户中心

1. 今日完成内容

今日完成了校园轻集市项目的 Pinia Store 设计与实现，包括用户状态管理（userStore）和收藏状态管理（favoriteStore），并将 Store 接入到导航栏、发布页面、二手交易列表页和个人中心页面中。同时改写了个人中心页面使其从 Store 读取用户资料和收藏列表，并修复了类型检查中的若干问题。

2. Store 设计说明

| Store 文件 | 管理内容 | 主要状态 | 主要方法 |
|---|---|---|---|
| src/stores/user.ts | 当前用户信息 | isLoggedIn、currentUser | updateProfile、login、logout |
| src/stores/favorite.ts | 收藏状态 | favorites | addFavorite、removeFavorite、toggleFavorite、isFavorite |

userStore 的设计思路：将当前用户的基本信息（姓名、学院、年级、简介）集中管理，通过 displayName 和 userDescription 两个 getter 对外提供格式化后的数据。favoriteStore 的设计思路：提供一个统一的收藏容器，通过 type + id 的组合来唯一标识一个收藏项，确保不会重复添加。

3. 状态边界说明

哪些数据放入了 Store：
- 当前用户信息放入 Store。因为导航栏（AppHeader）、发布页面（PublishView）和个人中心（UserCenterView）都需要读取用户名称，属于跨页面/组件的共享状态。
- 收藏列表放入 Store。因为二手交易页面（TradeView）需要判断是否已收藏，个人中心需要展示收藏列表，属于多个页面共同依赖的数据。

哪些数据没有放入 Store：
- 表单校验错误没有放入 Store。校验错误只在发布页面内部使用，不与其他组件共享，用 reactive 局部管理即可。
- 各个页面的列表数据（trades、lostFounds、groupBuys、errands）没有放入 Store。这些数据由各自页面在 onMounted 中通过 API 获取，属于页面级数据，没有跨页面复用的必要。
- 消息列表没有放入 Store。消息页面独立展示，暂时没有其他页面需要读取消息数据。
- 路由查询参数没有放入 Store。分类筛选等临时状态通过 Vue Router 的 query 管理，保持 URL 可分享。

4. 页面使用记录

- AppHeader.vue：引入 useUserStore，在顶部导航栏右侧显示当前用户名称（userStore.displayName）。
- PublishView.vue：引入 useUserStore，在提交二手交易、失物招领、拼单搭子、跑腿委托时，将发布人设为 userStore.displayName。
- TradeView.vue：引入 useFavoriteStore，在每个商品卡片的 footer 区域添加收藏按钮，调用 toggleFavorite 切换收藏状态，按钮文字在"收藏"和"已收藏"之间动态切换。
- UserCenterView.vue：同时引入 useUserStore 和 useFavoriteStore，展示用户头像、姓名、学院年级、简介，以及收藏列表。收藏列表中的每项支持"取消收藏"操作。

5. AI 协作记录

使用的 AI 工具：Cursor（Claude 模型）

核心提示词（Prompt）：
1. "创建用户状态 Store，推荐写法如下：……" —— 用户要求创建 src/stores/user.ts，AI 根据提供的代码模板生成了完整的 Pinia Store 文件，包括 CurrentUser 接口、state、getters 和 actions。
2. "在导航栏中显示用户信息" —— AI 修改了 AppHeader.vue，引入 userStore 并在模板中渲染 displayName。
3. "发布数据时，发布人可以改为从用户 Store 中读取" —— AI 修改了 PublishView.vue，将硬编码的 '当前用户' 替换为 userStore.displayName。
4. "创建 favorite.ts" —— 用户提供了完整的代码模板，AI 写入文件。
5. "在列表页面中添加收藏操作" —— AI 在 TradeView.vue 中引入 favoriteStore，添加收藏/取消收藏按钮。
6. "完善个人中心页面" —— 用户提供了完整模板，AI 实现并在此基础上添加了"我的发布"数据筛选逻辑。

AI 生成内容中的不合理之处：
- AI 最初在 TradeView.vue 中直接使用了 item.id 作为 number 类型传递，但 TradeItem 接口中 id 是 number | undefined，导致 TypeScript 类型检查报错。需要人工修正为 item.id! 非空断言。
- AI 生成的 UserCenterView.vue 中的"我的发布"部分，对 LostFoundItem 使用了 publisher 属性筛选，但 LostFoundItem 接口原本没有定义 publisher 字段，导致类型错误，需要人工在接口定义中添加。

6. 人工调整内容

1. 修复 TradeView.vue 中的类型错误：将 favoriteStore.toggleFavorite 和 isFavorite 调用中的 item.id 改为 item.id!，解决 number | undefined 不可赋值给 number 的问题。
2. 在 src/api/lostFound.ts 的 LostFoundItem 接口中添加 publisher?: string 字段，使得根据发布人筛选成为可能。
3. 在 PublishView.vue 的 createLostFound 调用中补充 publisher: userStore.displayName，确保失物招领信息也记录发布人。
4. 用户中心中"我的发布"部分原本只是占位提示，改为实际调用四类 API 获取数据，并通过 computed 按 publisher 筛选后再统一渲染。

7. 测试记录

进行了 type-check 测试（vue-tsc --build）和 build 测试（vite build）：

1. 初始 type-check 结果：3 个 TypeScript 错误：
   - src/views/TradeView.vue(27,13)：number | undefined 不可赋值给 number
   - src/views/TradeView.vue(33,50)：同上
   - src/views/UserCenterView.vue(114,42)：LostFoundItem 类型上不存在 publisher 属性
2. 修复以上 3 个错误后重新运行 npm run type-check，零错误通过。
3. 运行 npm run build-only，构建成功，产出 dist/ 目录，所有 chunk 正常生成。
4. 启动 Mock 服务（npm run mock）和 Dev 服务（npm run dev）后，API 接口可正常访问，/trades 返回 7 条数据，/messages 返回 6 条数据。
5. 浏览器中验证：导航栏显示"校园用户"；二手交易页每项商品底部有收藏按钮，点击后在"收藏"/"已收藏"间切换；个人中心显示用户资料和收藏列表，可取消收藏。

8. 遇到的问题与解决方法

问题：TypeScript 类型检查失败
原因：TradeItem 和 LostFoundItem 等接口中的 id 字段定义为可选（id?: number），而 FavoriteItem 的 id 为必填（id: number），导致在传递给 favoriteStore 方法时类型不兼容。同样，LostFoundItem 接口缺少 publisher 字段，导致按发布人筛选时报错。
解决方法：
- 对 id 使用非空断言 item.id!，因为 json-server 返回的数据必定包含 id；
- 在 LostFoundItem 接口中添加 publisher?: string 字段；
- 在 createLostFound 调用中补充 publisher 参数。

9. 今日反思

通过今天的实践，我深刻体会到 Pinia 状态管理对多页面前端应用的核心作用。在没有 Pinia 之前，页面间的数据共享只能通过路由参数、props 逐级传递或全局事件总线等原始方式实现，代码耦合度高且难以维护。引入 Pinia 后，用户信息和收藏列表等跨页面状态被集中管理在 Store 中，任何组件都可以通过简单的 API 调用读取或修改状态，数据流变得清晰可追踪。具体来说，userStore 让导航栏、发布页和个人中心能够一致地展示当前用户信息，favoriteStore 让交易列表页和个人中心的收藏数据保持同步。这种"状态提升"的设计模式将组件间的通信简化为组件与 Store 之间的单向数据流，大大降低了复杂度和出错概率。用户中心的实现则进一步展示了如何将多个 Store 组合使用，从 userStore 读取用户资料，从 favoriteStore 展示收藏列表，体现了 Pinia 在模块化状态管理方面的灵活性。状态边界的思考也让我认识到，并非所有数据都适合放入 Store——只在需要跨页面/组件共享时才使用全局状态，页面私有的数据（如表单校验、临时输入）应当保持局部化，这样才能保证 Store 的职责清晰且不臃肿。
