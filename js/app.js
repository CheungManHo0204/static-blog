/**
 * 主应用模块
 * 负责协调各个模块，处理UI交互
 */

const BlogApp = {
    // DOM元素引用
    domElements: {
        contentContainer: null,
        articleContainer: null,
        articleTitle: null,
        articleMeta: null,
        articleContent: null,
        themeToggle: null,
        backButton: null,
        navLinks: null,
        currentYear: null
    },
    
    /**
     * 初始化应用
     */
    init: function() {
        console.log("正在初始化博客应用...");
        
        // 初始化管理器
        BlogManager.init();
        
        // 缓存DOM元素引用
        this.cacheDOM();
        
        // 设置事件监听器
        this.setupEventListeners();
        
        // 设置主题
        this.setupTheme();
        
        // 显示首页
        this.showHomePage();
        
        // 设置页脚年份
        this.setFooterYear();
        
        console.log("博客应用初始化完成");
    },
    
    /**
     * 缓存DOM元素引用
     */
    cacheDOM: function() {
        this.domElements.contentContainer = document.getElementById("content-container");
        this.domElements.articleContainer = document.getElementById("article-container");
        this.domElements.articleTitle = document.getElementById("article-title");
        this.domElements.articleMeta = document.getElementById("article-meta");
        this.domElements.articleContent = document.getElementById("article-content");
        this.domElements.themeToggle = document.getElementById("theme-toggle");
        this.domElements.backButton = document.getElementById("back-to-list");
        this.domElements.navLinks = document.querySelectorAll(".nav-link");
        this.domElements.currentYear = document.getElementById("current-year");
    },
    
    /**
     * 设置事件监听器
     */
    setupEventListeners: function() {
        // 主题切换按钮
        this.domElements.themeToggle.addEventListener("click", () => {
            const newTheme = BlogUtils.ThemeUtils.toggleTheme();
            this.updateThemeIcon(newTheme);
        });
        
        // 返回按钮
        this.domElements.backButton.addEventListener("click", () => {
            this.showListPage();
        });
        
        // 导航链接
        this.domElements.navLinks.forEach(link => {
            link.addEventListener("click", (e) => {
                e.preventDefault();
                const page = link.getAttribute("data-page");
                this.navigateToPage(page);
            });
        });
        
        // 监听主题变化事件
        document.addEventListener(BlogConfig.EVENTS.THEME_CHANGED, (e) => {
            this.updateThemeIcon(e.detail);
        });
    },
    
    /**
     * 设置初始主题
     */
    setupTheme: function() {
        const currentTheme = BlogUtils.ThemeUtils.getCurrentTheme();
        BlogUtils.ThemeUtils.setTheme(currentTheme);
        this.updateThemeIcon(currentTheme);
    },
    
    /**
     * 更新主题图标
     * @param {string} theme - 当前主题
     */
    updateThemeIcon: function(theme) {
        const icon = this.domElements.themeToggle.querySelector("i");
        if (theme === "dark") {
            icon.className = "fas fa-sun";
        } else {
            icon.className = "fas fa-moon";
        }
    },
    
    /**
     * 导航到指定页面
     * @param {string} page - 页面类型
     */
    navigateToPage: function(page) {
        switch (page) {
            case BlogConfig.PAGE_TYPES.HOME:
                this.showHomePage();
                break;
            case BlogConfig.PAGE_TYPES.TECHNOLOGY:
                this.showCategoryPage(BlogConfig.ARTICLE_CATEGORIES.TECHNOLOGY);
                break;
            case BlogConfig.PAGE_TYPES.LIFE:
                this.showCategoryPage(BlogConfig.ARTICLE_CATEGORIES.LIFE);
                break;
            default:
                this.showHomePage();
        }
    },
    
    /**
     * 显示首页
     */
    showHomePage: async function() {
        BlogManager.setCurrentPage(BlogConfig.PAGE_TYPES.HOME);
        
        // 获取最新文章
        const latestArticles = await ApiService.getLatestArticles();
        
        // 获取分类统计
        const categoryStats = await ApiService.getCategoryStats();
        
        // 渲染首页
        this.renderHomePage(latestArticles, categoryStats);
        
        // 显示内容容器，隐藏文章容器
        BlogUtils.DOM.toggleElement(this.domElements.contentContainer, true);
        BlogUtils.DOM.toggleElement(this.domElements.articleContainer, false);
    },
    
    /**
     * 显示分类页面
     * @param {string} category - 分类标识
     */
    showCategoryPage: async function(category) {
        BlogManager.setCurrentPage(category, category);
        
        // 获取该分类的文章
        const articles = await ApiService.getArticlesByCategory(category);
        
        // 渲染分类页面
        this.renderCategoryPage(category, articles);
        
        // 显示内容容器，隐藏文章容器
        BlogUtils.DOM.toggleElement(this.domElements.contentContainer, true);
        BlogUtils.DOM.toggleElement(this.domElements.articleContainer, false);
    },
    
    /**
     * 显示文章详情页
     * @param {string|number} articleId - 文章ID
     */
    showArticlePage: async function(articleId) {
        // 获取文章数据
        const article = await ApiService.getArticleById(articleId);
        
        if (!article) {
            console.error(`文章ID ${articleId} 不存在`);
            this.showHomePage();
            return;
        }
        
        BlogManager.setCurrentArticle(article);
        
        // 获取Markdown内容
        const markdownContent = await ApiService.getMarkdownContent(article.filePath);
        
        // 渲染文章详情页
        this.renderArticlePage(article, markdownContent);
        
        // 显示文章容器，隐藏内容容器
        BlogUtils.DOM.toggleElement(this.domElements.contentContainer, false);
        BlogUtils.DOM.toggleElement(this.domElements.articleContainer, true);
    },
    
    /**
     * 显示列表页面（返回列表）
     */
    showListPage: function() {
        const state = BlogManager.getCurrentState();
        
        if (state.category) {
            this.showCategoryPage(state.category);
        } else {
            this.showHomePage();
        }
    },
    
    /**
     * 渲染首页
     * @param {Array} latestArticles - 最新文章列表
     * @param {Object} categoryStats - 分类统计
     */
    renderHomePage: function(latestArticles, categoryStats) {
        const { DOM } = BlogUtils;
        DOM.clearElement(this.domElements.contentContainer);
        
        // 创建首页容器
        const homeContainer = DOM.createElement("div", { className: "home-container" });
        
        // 添加欢迎标题
        const welcomeTitle = DOM.createElement("h1", { 
            className: "welcome-title",
            textContent: "欢迎来到我的博客"
        });
        homeContainer.appendChild(welcomeTitle);
        
        // 添加描述
        const description = DOM.createElement("p", {
            className: "welcome-description",
            textContent: "这里记录了我的技术学习和生活感悟。"
        });
        homeContainer.appendChild(description);
        
        // 添加分类统计
        const statsContainer = this.createCategoryStats(categoryStats);
        homeContainer.appendChild(statsContainer);
        
        // 添加最新文章标题
        const latestTitle = DOM.createElement("h2", {
            className: "section-title",
            textContent: "最新文章"
        });
        homeContainer.appendChild(latestTitle);
        
        // 添加最新文章列表
        if (latestArticles.length > 0) {
            const articlesGrid = this.createArticlesGrid(latestArticles);
            homeContainer.appendChild(articlesGrid);
        } else {
            const noArticles = DOM.createElement("p", {
                className: "no-articles",
                textContent: "暂无文章"
            });
            homeContainer.appendChild(noArticles);
        }
        
        this.domElements.contentContainer.appendChild(homeContainer);
    },
    
    /**
     * 渲染分类页面
     * @param {string} category - 分类标识
     * @param {Array} articles - 文章列表
     */
    renderCategoryPage: function(category, articles) {
        const { DOM } = BlogUtils;
        DOM.clearElement(this.domElements.contentContainer);
        
        // 创建分类页面容器
        const categoryContainer = DOM.createElement("div", { className: "category-container" });
        
        // 添加分类标题
        const categoryName = BlogManager.getCategoryName(category);
        const categoryIcon = BlogManager.getCategoryIcon(category);
        
        const categoryTitle = DOM.createElement("h1", { className: "category-title" });
        categoryTitle.innerHTML = `${categoryIcon} ${categoryName}`;
        categoryContainer.appendChild(categoryTitle);
        
        // 添加文章数量
        const articleCount = DOM.createElement("p", {
            className: "category-count",
            textContent: `共 ${articles.length} 篇文章`
        });
        categoryContainer.appendChild(articleCount);
        
        // 根据分类类型渲染不同的文章列表
        if (category === BlogConfig.ARTICLE_CATEGORIES.TECHNOLOGY) {
            // 技术类文章使用列表布局
            const articlesList = this.createArticlesList(articles);
            categoryContainer.appendChild(articlesList);
        } else if (category === BlogConfig.ARTICLE_CATEGORIES.LIFE) {
            // 生活类文章使用卡片网格布局
            const articlesGrid = this.createArticlesGrid(articles);
            categoryContainer.appendChild(articlesGrid);
        } else {
            // 默认使用列表布局
            const articlesList = this.createArticlesList(articles);
            categoryContainer.appendChild(articlesList);
        }
        
        this.domElements.contentContainer.appendChild(categoryContainer);
    },
    
    /**
     * 渲染文章详情页
     * @param {Object} article - 文章对象
     * @param {string} markdownContent - Markdown内容
     */
    renderArticlePage: function(article, markdownContent) {
        // 设置文章标题
        this.domElements.articleTitle.textContent = article.title;
        
        // 设置文章元数据
        const categoryName = BlogManager.getCategoryName(article.category);
        const formattedDate = BlogUtils.DateUtils.formatDate(article.date);
        const relativeDate = BlogUtils.DateUtils.getRelativeTime(article.date);
        
        this.domElements.articleMeta.innerHTML = `
            <span class="article-category">${categoryName}</span>
            <span class="article-date">${formattedDate} (${relativeDate})</span>
        `;
        
        // 渲染Markdown内容
        this.domElements.articleContent.innerHTML = marked.parse(markdownContent);
    },
    
    /**
     * 创建分类统计组件
     * @param {Object} categoryStats - 分类统计对象
     * @returns {HTMLElement} 分类统计容器
     */
    createCategoryStats: function(categoryStats) {
        const { DOM } = BlogUtils;
        const statsContainer = DOM.createElement("div", { className: "category-stats" });
        
        // 统计标题
        const statsTitle = DOM.createElement("h3", {
            className: "stats-title",
            textContent: "文章分类统计"
        });
        statsContainer.appendChild(statsTitle);
        
        // 统计项容器
        const statsItems = DOM.createElement("div", { className: "stats-items" });
        
        // 遍历分类统计
        Object.entries(categoryStats).forEach(([category, count]) => {
            const categoryName = BlogManager.getCategoryName(category);
            const categoryIcon = BlogManager.getCategoryIcon(category);
            
            const statItem = DOM.createElement("div", { className: "stat-item" });
            statItem.innerHTML = `
                <div class="stat-icon">${categoryIcon}</div>
                <div class="stat-info">
                    <div class="stat-name">${categoryName}</div>
                    <div class="stat-count">${count} 篇</div>
                </div>
            `;
            
            // 添加点击事件，跳转到分类页面
            statItem.addEventListener("click", () => {
                this.showCategoryPage(category);
            });
            
            statsItems.appendChild(statItem);
        });
        
        statsContainer.appendChild(statsItems);
        return statsContainer;
    },
    
    /**
     * 创建文章列表（技术类文章使用）
     * @param {Array} articles - 文章列表
     * @returns {HTMLElement} 文章列表容器
     */
    createArticlesList: function(articles) {
        const { DOM, StringUtils } = BlogUtils;
        const articlesList = DOM.createElement("div", { className: "articles-list" });
        
        if (articles.length === 0) {
            const noArticles = DOM.createElement("p", {
                className: "no-articles",
                textContent: "暂无文章"
            });
            articlesList.appendChild(noArticles);
            return articlesList;
        }
        
        articles.forEach(article => {
            const listItem = this.createArticleListItem(article);
            articlesList.appendChild(listItem);
        });
        
        return articlesList;
    },
    
    /**
     * 创建文章网格（生活类文章使用）
     * @param {Array} articles - 文章列表
     * @returns {HTMLElement} 文章网格容器
     */
    createArticlesGrid: function(articles) {
        const { DOM } = BlogUtils;
        const articlesGrid = DOM.createElement("div", { className: "articles-grid" });
        
        if (articles.length === 0) {
            const noArticles = DOM.createElement("p", {
                className: "no-articles",
                textContent: "暂无文章"
            });
            articlesGrid.appendChild(noArticles);
            return articlesGrid;
        }
        
        articles.forEach(article => {
            const card = this.createArticleCard(article);
            articlesGrid.appendChild(card);
        });
        
        return articlesGrid;
    },
    
    /**
     * 创建文章列表项
     * @param {Object} article - 文章对象
     * @returns {HTMLElement} 文章列表项
     */
    createArticleListItem: function(article) {
        const { DOM, DateUtils, StringUtils } = BlogUtils;
        
        const listItem = DOM.createElement("div", { className: "article-list-item" });
        
        // 创建列表项内容
        const articleLink = DOM.createElement("a", {
            className: "article-list-link",
            href: "#",
            onclick: (e) => {
                e.preventDefault();
                this.showArticlePage(article.id);
            }
        });
        
        // 文章标题
        const title = DOM.createElement("h3", {
            className: "article-list-title",
            textContent: article.title
        });
        
        // 文章元数据
        const meta = DOM.createElement("div", { className: "article-list-meta" });
        const formattedDate = DateUtils.formatDate(article.date);
        const relativeDate = DateUtils.getRelativeTime(article.date);
        
        meta.innerHTML = `
            <span class="article-date">${formattedDate}</span>
            <span class="article-relative-date">(${relativeDate})</span>
        `;
        
        // 文章摘要
        const summary = DOM.createElement("p", {
            className: "article-list-summary",
            textContent: StringUtils.extractSummaryFromMarkdown(
                article.content, 
                BlogConfig.DISPLAY.SUMMARY_LENGTH
            )
        });
        
        // 组装列表项
        articleLink.appendChild(title);
        articleLink.appendChild(meta);
        articleLink.appendChild(summary);
        listItem.appendChild(articleLink);
        
        return listItem;
    },
    
    /**
     * 创建文章卡片
     * @param {Object} article - 文章对象
     * @returns {HTMLElement} 文章卡片
     */
    createArticleCard: function(article) {
        const { DOM, DateUtils, StringUtils } = BlogUtils;
        
        const card = DOM.createElement("div", { className: "article-card" });
        
        // 卡片头部（包含分类图标）
        const cardHeader = DOM.createElement("div", { className: "card-header" });
        const categoryIcon = BlogManager.getCategoryIcon(article.category);
        cardHeader.innerHTML = categoryIcon;
        
        // 卡片内容
        const cardContent = DOM.createElement("div", { className: "card-content" });
        
        // 文章标题
        const title = DOM.createElement("h3", {
            className: "card-title",
            textContent: article.title
        });
        
        // 文章日期
        const date = DOM.createElement("div", { className: "card-date" });
        const relativeDate = DateUtils.getRelativeTime(article.date);
        date.textContent = relativeDate;
        
        // 文章摘要
        const summary = DOM.createElement("p", {
            className: "card-summary",
            textContent: StringUtils.extractSummaryFromMarkdown(
                article.content, 
                BlogConfig.DISPLAY.SUMMARY_LENGTH
            )
        });
        
        // 阅读更多按钮
        const readMore = DOM.createElement("button", {
            className: "card-read-more",
            textContent: "阅读全文",
            onclick: () => {
                this.showArticlePage(article.id);
            }
        });
        
        // 组装卡片内容
        cardContent.appendChild(title);
        cardContent.appendChild(date);
        cardContent.appendChild(summary);
        cardContent.appendChild(readMore);
        
        // 组装卡片
        card.appendChild(cardHeader);
        card.appendChild(cardContent);
        
        return card;
    },
    
    /**
     * 设置页脚年份
     */
    setFooterYear: function() {
        const currentYear = new Date().getFullYear();
        this.domElements.currentYear.textContent = currentYear;
    }
};

// 应用初始化
document.addEventListener("DOMContentLoaded", () => {
    BlogApp.init();
});