# 部署到 GitHub Pages

## 步骤 1：创建 GitHub 仓库

1. 访问 https://github.com/new
2. 创建新仓库，命名为 `claude-code-cn`
3. 不要初始化 README（我们已经有代码了）

## 步骤 2：关联本地仓库到 GitHub

将下面的命令中的 `YOUR_USERNAME` 替换为您的 GitHub 用户名：

```bash
cd "C:\Users\张海峰\Desktop\claudeCodeInChain"
git remote add origin https://github.com/YOUR_USERNAME/claude-code-cn.git
git branch -M main
git push -u origin main
```

## 步骤 3：启用 GitHub Pages

1. 进入仓库页面
2. 点击 **Settings** (设置)
3. 点击左侧菜单的 **Pages**
4. 在 **Source** 下，选择 **GitHub Actions**
5. 点击保存

## 步骤 4：验证部署

1. 等待 GitHub Actions 完成部署（约 1-2 分钟）
2. 访问 `https://YOUR_USERNAME.github.io/claude-code-cn/`
3. 您的网站应该已经上线！

## 自动部署

以后每次推送代码到 main 分支，GitHub Pages 会自动重新部署网站。

```bash
git add .
git commit -m "更新内容"
git push
```

## 自定义域名（可选）

1. 在仓库根目录创建 `CNAME` 文件
2. 文件内容为您的域名（如 `docs.example.com`）
3. 在域名提供商处添加 DNS 记录
4. 在 GitHub Pages 设置中配置自定义域名
