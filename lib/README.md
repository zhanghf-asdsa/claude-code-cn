# Prism.js 代码高亮库

## 方案 A: 使用 CDN（推荐）

在所有 HTML 文件中，将以下两行：

```html
<link rel="stylesheet" href="../lib/prism.css">
<script src="../lib/prism.js"></script>
```

替换为：

```html
<link href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism.min.css" rel="stylesheet">
<script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/prism.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-bash.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-python.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-typescript.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-json.min.js"></script>
```

## 方案 B: 本地文件

1. 访问 https://prismjs.com/download.html
2. 选择主题: "Default"
3. 选择语言: Bash, Python, TypeScript, JSON, JavaScript
4. 下载 JS 和 CSS 文件
5. 将文件放到这个目录：
   - CSS 文件命名为 `prism.css`
   - JS 文件命名为 `prism.js`

## 支持的语言

- Bash/shell
- Python
- TypeScript
- JavaScript
- JSON
- Markdown
