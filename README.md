# 极简风格个人博客网站

一个简洁、现代、响应式的个人博客网站，支持亮色/暗色主题切换，直接读取 Markdown 文件生成博客内容。

## 功能特性

- **极简设计**：干净、简洁的界面，专注于内容
- **主题切换**：支持亮色/暗色模式切换，自动保存用户偏好
- **响应式布局**：适配各种屏幕尺寸
- **Markdown 支持**：直接读取和渲染 Markdown 文件
- **分类展示**：技术类文章以列表形式展示，生活类文章以卡片形式展示
- **模块化代码**：业务与视图分离，便于维护和扩展

## 项目结构

my-blog/
├── README.md # 项目说明
├── index.html # 主 HTML 文件
├── css/ # 样式文件夹
│ ├── style.css # 主样式文件
│ ├── variables.css # CSS 变量
│ ├── base.css # 基础样式
│ ├── layout.css # 布局样式
│ └── components.css # 组件样式
├── js/ # JavaScript 文件夹
│ ├── config.js # 配置文件
│ ├── utils.js # 工具函数
│ ├── blog.js # 博客数据管理
│ ├── app.js # 主应用逻辑
│ └── services/ # 数据服务层
│ └── api.js # 数据接口服务
├── mock/ # 模拟数据文件夹
│ └── articles.js # 文章模拟数据
└── assets/ # 资源文件夹（可选）
├── images/ # 图片
└── articles/ # Markdown 文章

## 使用方法

### 1. 本地运行

1. 克隆或下载本项目到本地
2. 直接在浏览器中打开 `index.html` 文件即可运行

### 2. 添加文章

1. 在 `articles/` 目录下创建 Markdown 文件
2. 在 `mock/articles.js` 中添加文章元数据
3. 重启应用即可看到新文章

### 3. 部署到服务器

1. 将整个项目上传到服务器
2. 修改 `js/services/api.js` 中的 API 调用，连接到真实的数据接口
3. 配置服务器支持静态文件服务

## 开发说明

### 配置说明

- 所有配置项集中在 `js/config.js` 文件中
- 包括博客信息、页面类型、显示设置等

### 数据管理

- 使用模拟数据进行开发调试
- 数据服务层已预留接口，便于后期切换到真实数据源
- 支持从 Markdown 文件读取内容

### 样式规范

- 使用 CSS 变量统一管理主题颜色
- 采用 BEM 命名规范
- 响应式设计，支持移动端和桌面端

### 扩展性

- 模块化设计，便于添加新功能
- 预留了良好的迭代空间
- 清晰的代码结构，便于团队协作

## 技术栈

- 原生 HTML/CSS/JavaScript
- Marked.js (Markdown 解析)
- GitHub Markdown CSS (Markdown 样式)
- Font Awesome (图标)

## 浏览器支持

- Chrome 60+
- Firefox 60+
- Safari 12+
- Edge 79+

## 后续计划

1. 添加搜索功能
2. 支持文章标签
3. 添加评论系统
4. 集成统计分析
5. 优化 SEO

## 许可证

MIT License
