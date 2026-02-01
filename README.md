# 今日待办 - 云同步版

跨设备同步的待办事项应用。

## 部署步骤

### 1. 创建 Upstash Redis 数据库（免费）

1. 访问 https://upstash.com 并注册账号
2. 点击 "Create Database"
3. 选择免费套餐，区域选择最近的
4. 创建后，复制以下两个值：
   - `UPSTASH_REDIS_REST_URL`
   - `UPSTASH_REDIS_REST_TOKEN`

### 2. 部署到 Vercel（免费）

1. 将此项目推送到 GitHub
2. 访问 https://vercel.com 并用 GitHub 登录
3. 点击 "Import Project"，选择这个仓库
4. 在 "Environment Variables" 中添加：
   - `UPSTASH_REDIS_REST_URL` = 你的 URL
   - `UPSTASH_REDIS_REST_TOKEN` = 你的 Token
5. 点击 "Deploy"

### 3. 使用

1. 访问 Vercel 分配的域名（如 xxx.vercel.app）
2. 输入一个同步密钥
3. 在其他设备上输入相同密钥即可同步

## 本地开发

```bash
npm install
npm run dev
```

需要创建 `.env` 文件：
```
UPSTASH_REDIS_REST_URL=your_url
UPSTASH_REDIS_REST_TOKEN=your_token
```
