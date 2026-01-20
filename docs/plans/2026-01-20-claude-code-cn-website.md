# Claude Code 中文官网实施计划

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**目标:** 构建一个纯静态的 Claude Code 中文文档网站，完整翻译官方文档内容

**架构:** 纯静态 HTML + CSS + 少量 JavaScript，采用三栏布局（侧边导航 + 主内容 + 可选右侧），纯前端搜索和代码高亮

**技术栈:** HTML5, CSS3 (变量), Vanilla JavaScript, Prism.js

---

## Task 1: 项目基础结构搭建

**文件:**
- Create: `index.html`
- Create: `assets/css/style.css`
- Create: `assets/js/search.js`
- Create: `assets/js/search-index.json`
- Create: `lib/prism.js` (下载)
- Create: `lib/prism.css` (下载)

**Step 1: 创建项目目录结构**

```bash
mkdir -p docs/getting-started
mkdir -p docs/concepts
mkdir -p docs/commands
mkdir -p docs/skills
mkdir -p docs/mcp
mkdir -p docs/api
mkdir -p assets/css
mkdir -p assets/js
mkdir -p lib
```

**Step 2: 创建首页 index.html**

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Claude Code 中文文档</title>
  <link rel="stylesheet" href="assets/css/style.css">
</head>
<body>
  <aside class="sidebar">
    <div class="brand">Claude Code 中文文档</div>
    <input class="search-input" type="text" placeholder="搜索文档..." id="searchInput">
    <nav class="doc-nav">
      <details class="nav-section" open>
        <summary>快速开始</summary>
        <ul>
          <li><a href="docs/getting-started/installation.html">安装</a></li>
          <li><a href="docs/getting-started/first-steps.html">第一步</a></li>
        </ul>
      </details>
      <details class="nav-section">
        <summary>概念</summary>
        <ul>
          <li><a href="docs/concepts/overview.html">概述</a></li>
        </ul>
      </details>
    </nav>
  </aside>

  <main class="content">
    <article class="doc-article">
      <h1>欢迎使用 Claude Code 中文文档</h1>
      <p class="intro">Claude Code 是 Anthropic 官方的 AI 辅助开发工具...</p>
      <div class="feature-grid">
        <div class="feature-card">
          <h2>🚀 快速开始</h2>
          <p>几分钟内开始使用 Claude Code</p>
          <a href="docs/getting-started/installation.html" class="btn">开始 →</a>
        </div>
      </div>
    </article>
  </main>

  <div class="search-results" id="searchResults"></div>

  <script src="assets/js/search.js"></script>
</body>
</html>
```

**Step 3: 创建主样式文件 assets/css/style.css**

```css
:root {
  /* 颜色 */
  --color-bg: #ffffff;
  --color-surface: #f9f9f9;
  --color-border: #e5e5e5;
  --color-text: #1a1a1a;
  --color-text-muted: #666666;
  --color-primary: #000000;
  --color-link: #0066cc;
  --color-code-bg: #f4f4f4;

  /* 间距 */
  --space-xs: 4px;
  --space-sm: 8px;
  --space-md: 16px;
  --space-lg: 24px;
  --space-xl: 32px;

  /* 字体 - 中文优化 */
  --font-sans: -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif;
  --font-mono: "SF Mono", "Consolas", "Liberation Mono", "Menlo", monospace;

  /* 尺寸 */
  --sidebar-width: 250px;
  --content-max-width: 800px;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: var(--font-sans);
  color: var(--color-text);
  line-height: 1.8;
  background: var(--color-bg);
}

/* 侧边栏 */
.sidebar {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  width: var(--sidebar-width);
  background: var(--color-surface);
  border-right: 1px solid var(--color-border);
  padding: var(--space-lg);
  overflow-y: auto;
}

.brand {
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: var(--space-lg);
}

.search-input {
  width: 100%;
  padding: var(--space-sm) var(--space-md);
  border: 1px solid var(--color-border);
  border-radius: 4px;
  font-size: 0.9rem;
  margin-bottom: var(--space-lg);
}

.doc-nav details {
  margin-bottom: var(--space-md);
}

.doc-nav summary {
  cursor: pointer;
  font-weight: 500;
  padding: var(--space-xs) 0;
}

.doc-nav a {
  display: block;
  padding: var(--space-xs) var(--space-md);
  color: var(--color-text-muted);
  text-decoration: none;
  font-size: 0.9rem;
}

.doc-nav a:hover {
  color: var(--color-link);
}

/* 主内容区 */
.content {
  margin-left: var(--sidebar-width);
  padding: var(--space-xl) var(--space-xl) var(--space-xl) calc(var(--space-xl) * 2);
  max-width: var(--content-max-width);
}

.doc-article h1 {
  font-size: 2rem;
  margin-bottom: var(--space-lg);
}

.doc-article h2 {
  font-size: 1.5rem;
  margin: var(--space-xl) 0 var(--space-md);
}

.doc-article p {
  margin-bottom: var(--space-md);
}

.doc-article code {
  background: var(--color-code-bg);
  padding: 2px 6px;
  border-radius: 3px;
  font-family: var(--font-mono);
  font-size: 0.9em;
}

.doc-article pre {
  background: var(--color-code-bg);
  padding: var(--space-md);
  border-radius: 6px;
  overflow-x: auto;
  margin-bottom: var(--space-md);
}

/* 搜索结果 */
.search-results {
  display: none;
  position: fixed;
  top: 60px;
  left: var(--sidebar-width);
  right: 0;
  max-height: 400px;
  overflow-y: auto;
  background: white;
  border: 1px solid var(--color-border);
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.search-results.active {
  display: block;
}

.search-result-item {
  padding: var(--space-md);
  border-bottom: 1px solid var(--color-border);
}

.search-result-item a {
  display: block;
  text-decoration: none;
  color: var(--color-text);
}

.search-result-item a:hover {
  background: var(--color-surface);
}

/* 响应式 */
@media (max-width: 768px) {
  .sidebar {
    transform: translateX(-100%);
    transition: transform 0.3s;
    z-index: 100;
  }

  .sidebar.open {
    transform: translateX(0);
  }

  .content {
    margin-left: 0;
    padding: var(--space-lg);
  }

  .search-results {
    left: 0;
  }
}

/* 首页特色 */
.intro {
  font-size: 1.2rem;
  color: var(--color-text-muted);
  margin-bottom: var(--space-xl);
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--space-lg);
  margin-top: var(--space-xl);
}

.feature-card {
  padding: var(--space-lg);
  border: 1px solid var(--color-border);
  border-radius: 8px;
}

.feature-card h2 {
  margin-bottom: var(--space-sm);
}

.btn {
  display: inline-block;
  margin-top: var(--space-md);
  padding: var(--space-sm) var(--space-lg);
  background: var(--color-primary);
  color: white;
  text-decoration: none;
  border-radius: 4px;
}
```

**Step 4: 创建搜索索引文件 assets/js/search-index.json**

```json
{
  "pages": [
    {
      "title": "首页",
      "url": "index.html",
      "keywords": ["claude code", "首页", "入门"],
      "summary": "Claude Code 中文文档首页"
    }
  ]
}
```

**Step 5: 创建搜索脚本 assets/js/search.js**

```javascript
const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');

async function loadSearchIndex() {
  const response = await fetch('assets/js/search-index.json');
  return await response.json();
}

let searchIndex = null;

searchInput.addEventListener('input', async (e) => {
  const query = e.target.value.trim();

  if (!searchIndex) {
    searchIndex = await loadSearchIndex();
  }

  if (query.length < 2) {
    searchResults.classList.remove('active');
    return;
  }

  const results = searchIndex.pages.filter(page => {
    const text = (page.title + ' ' + page.keywords + ' ' + page.summary).toLowerCase();
    return text.includes(query.toLowerCase());
  });

  displayResults(results);
});

function displayResults(results) {
  if (results.length === 0) {
    searchResults.innerHTML = '<div class="search-result-item">未找到结果</div>';
  } else {
    searchResults.innerHTML = results.map(page => `
      <div class="search-result-item">
        <a href="${page.url}">
          <strong>${page.title}</strong>
          <p style="font-size: 0.9em; color: #666;">${page.summary}</p>
        </a>
      </div>
    `).join('');
  }
  searchResults.classList.add('active');
}

document.addEventListener('click', (e) => {
  if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
    searchResults.classList.remove('active');
  }
});
```

**Step 6: 下载 Prism.js**

访问 https://prismjs.com/download.html
- 选择主题: "Default"
- 选择语言: JavaScript, Python, TypeScript, Bash, JSON
- 下载 JS 和 CSS 文件到 `lib/` 目录

**Step 7: 初始化 Git 仓库并提交**

```bash
git init
git add .
git commit -m "feat: 初始化项目基础结构和样式"
```

---

## Task 2: 创建文档页面模板

**文件:**
- Create: `docs/template.html`

**Step 1: 创建文档模板**

创建 `docs/template.html` 作为所有文档页面的模板：

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{{PAGE_TITLE}} - Claude Code 中文文档</title>
  <link rel="stylesheet" href="../assets/css/style.css">
  <link rel="stylesheet" href="../lib/prism.css">
</head>
<body>
  <aside class="sidebar">
    <div class="brand">
      <a href="../index.html" style="text-decoration: none; color: inherit;">Claude Code 中文文档</a>
    </div>
    <input class="search-input" type="text" placeholder="搜索文档..." id="searchInput">
    <nav class="doc-nav">
      {{NAVIGATION}}
    </nav>
  </aside>

  <main class="content">
    <article class="doc-article">
      <div class="breadcrumbs">{{BREADCRUMBS}</div>
      {{CONTENT}}

      <div class="doc-nav-footer">
        <a class="prev-link" href="{{PREV_PAGE}}">← {{PREV_TITLE}}</a>
        <a class="next-link" href="{{NEXT_PAGE}}">{{NEXT_TITLE}} →</a>
      </div>
    </article>
  </main>

  <div class="search-results" id="searchResults"></div>

  <script src="../assets/js/search.js"></script>
  <script src="../lib/prism.js"></script>
</body>
</html>
```

**Step 2: 添加面包屑和导航样式**

在 `assets/css/style.css` 中添加：

```css
.breadcrumbs {
  font-size: 0.85rem;
  color: var(--color-text-muted);
  margin-bottom: var(--space-lg);
}

.doc-nav-footer {
  display: flex;
  justify-content: space-between;
  margin-top: var(--space-xl);
  padding-top: var(--space-lg);
  border-top: 1px solid var(--color-border);
}

.doc-nav-footer a {
  padding: var(--space-sm) var(--space-lg);
  border: 1px solid var(--color-border);
  border-radius: 4px;
  text-decoration: none;
  color: var(--color-text);
}

.doc-nav-footer a:hover {
  background: var(--color-surface);
}
```

**Step 3: 提交**

```bash
git add docs/template.html assets/css/style.css
git commit -m "feat: 添加文档页面模板"
```

---

## Task 3: 实现示例文档页面

**文件:**
- Create: `docs/getting-started/installation.html`

**Step 1: 创建安装指南页面**

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>安装 Claude Code - Claude Code 中文文档</title>
  <link rel="stylesheet" href="../../assets/css/style.css">
  <link rel="stylesheet" href="../../lib/prism.css">
</head>
<body>
  <aside class="sidebar">
    <div class="brand">
      <a href="../../index.html" style="text-decoration: none; color: inherit;">Claude Code 中文文档</a>
    </div>
    <input class="search-input" type="text" placeholder="搜索文档..." id="searchInput">
    <nav class="doc-nav">
      <details class="nav-section" open>
        <summary>快速开始</summary>
        <ul>
          <li><a href="installation.html" style="color: var(--color-link);">安装</a></li>
          <li><a href="first-steps.html">第一步</a></li>
        </ul>
      </details>
      <details class="nav-section">
        <summary>概念</summary>
        <ul>
          <li><a href="../concepts/overview.html">概述</a></li>
        </ul>
      </details>
    </nav>
  </aside>

  <main class="content">
    <article class="doc-article">
      <div class="breadcrumbs">首页 > 快速开始</div>

      <h1>安装 Claude Code</h1>

      <p>Claude Code 是 Anthropic 官方提供的 AI 辅助开发命令行工具。本指南将帮助您完成安装。</p>

      <h2>系统要求</h2>
      <ul>
        <li>Node.js 18 或更高版本</li>
        <li>npm、yarn 或 pnpm</li>
        <li>macOS、Linux 或 Windows (WSL)</li>
      </ul>

      <h2>安装步骤</h2>

      <h3>使用 npm 安装</h3>
      <pre><code class="language-bash">npm install -g @anthropic-ai/claude-code</code></pre>

      <h3>使用 yarn 安装</h3>
      <pre><code class="language-bash">yarn global add @anthropic-ai/claude-code</code></pre>

      <h3>使用 pnpm 安装</h3>
      <pre><code class="language-bash">pnpm add -g @anthropic-ai/claude-code</code></pre>

      <h2>验证安装</h2>
      <p>安装完成后，运行以下命令验证：</p>
      <pre><code class="language-bash">claude --version</code></pre>

      <p>如果显示版本号，说明安装成功！</p>

      <h2>下一步</h2>
      <p>安装完成后，请查看<a href="first-steps.html">第一步</a>了解如何开始使用。</p>

      <div class="doc-nav-footer">
        <a class="prev-link" href="../../index.html">← 首页</a>
        <a class="next-link" href="first-steps.html">第一步 →</a>
      </div>
    </article>
  </main>

  <div class="search-results" id="searchResults"></div>

  <script src="../../assets/js/search.js"></script>
  <script src="../../lib/prism.js"></script>
</body>
</html>
```

**Step 2: 创建第一步页面**

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>第一步 - Claude Code 中文文档</title>
  <link rel="stylesheet" href="../../assets/css/style.css">
  <link rel="stylesheet" href="../../lib/prism.css">
</head>
<body>
  <aside class="sidebar">
    <div class="brand">
      <a href="../../index.html" style="text-decoration: none; color: inherit;">Claude Code 中文文档</a>
    </div>
    <input class="search-input" type="text" placeholder="搜索文档..." id="searchInput">
    <nav class="doc-nav">
      <details class="nav-section" open>
        <summary>快速开始</summary>
        <ul>
          <li><a href="installation.html">安装</a></li>
          <li><a href="first-steps.html" style="color: var(--color-link);">第一步</a></li>
        </ul>
      </details>
      <details class="nav-section">
        <summary>概念</summary>
        <ul>
          <li><a href="../concepts/overview.html">概述</a></li>
        </ul>
      </details>
    </nav>
  </aside>

  <main class="content">
    <article class="doc-article">
      <div class="breadcrumbs">首页 > 快速开始</div>

      <h1>第一步</h1>

      <p>恭喜您安装了 Claude Code！让我们开始第一次对话。</p>

      <h2>启动 Claude Code</h2>
      <p>在您的项目目录中运行：</p>
      <pre><code class="language-bash">claude</code></pre>

      <h2>您的第一个请求</h2>
      <p>尝试让 Claude Code 帮您完成一个简单任务：</p>
      <pre><code class="language-bash">> 帮我创建一个 Hello World 函数</code></pre>

      <h2>常用命令</h2>
      <table>
        <thead>
          <tr>
            <th>命令</th>
            <th>说明</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>/help</code></td>
            <td>显示帮助信息</td>
          </tr>
          <tr>
            <td><code>/clear</code></td>
            <td>清除对话历史</td>
          </tr>
          <tr>
            <td><code>Ctrl+C</code></td>
            <td>退出 Claude Code</td>
          </tr>
        </tbody>
      </table>

      <h2>下一步</h2>
      <p>现在您已经了解了基本操作，查看<a href="../concepts/overview.html">概念概述</a>了解更多。</p>

      <div class="doc-nav-footer">
        <a class="prev-link" href="installation.html">← 安装</a>
        <a class="next-link" href="../concepts/overview.html">概念概述 →</a>
      </div>
    </article>
  </main>

  <div class="search-results" id="searchResults"></div>

  <script src="../../assets/js/search.js"></script>
  <script src="../../lib/prism.js"></script>
</body>
</html>
```

**Step 3: 添加表格样式**

在 `assets/css/style.css` 中添加：

```css
.doc-article table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: var(--space-md);
}

.doc-article th,
.doc-article td {
  padding: var(--space-sm) var(--space-md);
  border: 1px solid var(--color-border);
  text-align: left;
}

.doc-article th {
  background: var(--color-surface);
  font-weight: 600;
}
```

**Step 4: 提交**

```bash
git add docs/getting-started/ assets/css/style.css
git commit -m "feat: 添加快速开始示例页面"
```

---

## Task 4: 更新搜索索引

**文件:**
- Modify: `assets/js/search-index.json`

**Step 1: 更新搜索索引**

```json
{
  "pages": [
    {
      "title": "首页",
      "url": "index.html",
      "keywords": ["claude code", "首页", "入门", "介绍"],
      "summary": "Claude Code 中文文档首页，快速了解和开始使用"
    },
    {
      "title": "安装",
      "url": "docs/getting-started/installation.html",
      "keywords": ["安装", "setup", "install", "npm", "yarn"],
      "summary": "Claude Code 安装指南，支持 npm、yarn、pnpm"
    },
    {
      "title": "第一步",
      "url": "docs/getting-started/first-steps.html",
      "keywords": ["入门", "开始", "命令", "help", "clear"],
      "summary": "Claude Code 第一次使用指南，常用命令介绍"
    }
  ]
}
```

**Step 2: 提交**

```bash
git add assets/js/search-index.json
git commit -m "feat: 更新搜索索引"
```

---

## Task 5: 本地测试和验证

**文件:**
- Test: 本地浏览器测试

**Step 1: 启动本地服务器**

```bash
# 使用 Python
python -m http.server 8000

# 或使用 Node.js
npx serve .
```

**Step 2: 测试清单**

在浏览器中访问 `http://localhost:8000` 并验证：

- [ ] 首页正常显示
- [ ] 侧边栏导航可点击
- [ ] 搜索框可以输入并显示结果
- [ ] 点击安装页面跳转正常
- [ ] 点击第一步页面跳转正常
- [ ] 代码块有语法高亮
- [ ] 移动端响应式正常（缩放浏览器窗口）

**Step 3: 记录问题**

如有问题，记录到 `docs/test-notes.md`

**Step 4: 提交**

```bash
git add .
git commit -m "test: 完成本地测试验证"
```

---

## Task 6: 部署到 GitHub Pages

**文件:**
- Create: `.github/workflows/deploy.yml`

**Step 1: 创建 GitHub 仓库**

```bash
# 在 GitHub 上创建新仓库 claude-code-cn
# 然后关联本地仓库
git remote add origin https://github.com/YOUR_USERNAME/claude-code-cn.git
git branch -M main
```

**Step 2: 创建部署工作流**

创建 `.github/workflows/deploy.yml`：

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Pages
        uses: actions/configure-pages@v4

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: '.'

      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

**Step 3: 在 GitHub 仓库设置中启用 Pages**

1. 进入仓库 Settings > Pages
2. Source 选择 "GitHub Actions"

**Step 4: 推送代码**

```bash
git push -u origin main
```

**Step 5: 验证部署**

访问 `https://YOUR_USERNAME.github.io/claude-code-cn/` 确认网站正常上线

**Step 6: 提交**

```bash
git add .github/workflows/deploy.yml
git commit -m "ci: 添加 GitHub Pages 部署配置"
```

---

## 后续任务（不包含在本次实施）

1. **翻译更多文档内容**
   - 概念章节
   - 命令参考
   - 技能开发指南
   - MCP 集成指南
   - API 参考

2. **功能增强**
   - 添加移动端菜单切换按钮
   - 实现页面进度指示器
   - 添加"编辑此页"链接
   - 实现深色模式（如需要）

3. **内容维护**
   - 定期同步官方文档更新
   - 收集用户反馈
   - 优化翻译质量

---

## 实施总结

完成以上 6 个任务后，您将拥有：

✅ 完整的项目基础结构
✅ 响应式设计的文档网站
✅ 纯前端搜索功能
✅ 代码语法高亮
✅ 示例文档页面
✅ 自动化部署到 GitHub Pages

网站将可以通过 `https://YOUR_USERNAME.github.io/claude-code-cn/` 访问。
