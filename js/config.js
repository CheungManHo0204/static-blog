/**
 * 博客配置文件
 * 包含所有可配置的常量、路径和设置
 */

const BlogConfig = {
    // 博客信息
    BLOG_INFO: {
        name: "我的博客",
        author: "博主",
        description: "一个极简风格的个人博客网站",
        year: new Date().getFullYear()
    },
    
    // 页面类型
    PAGE_TYPES: {
        HOME: "home",
        TECHNOLOGY: "technology",
        LIFE: "life",
        ARTICLE: "article"
    },
    
    // 文章分类
    ARTICLE_CATEGORIES: {
        TECHNOLOGY: "technology",
        LIFE: "life"
    },
    
    // 显示设置
    DISPLAY: {
        // 每页显示文章数量
        ITEMS_PER_PAGE: 10,
        // 首页显示的最新文章数量
        LATEST_ARTICLES_COUNT: 6,
        // 截断摘要长度
        SUMMARY_LENGTH: 150
    },
    
    // 存储键名
    STORAGE_KEYS: {
        THEME: "blog_theme_preference"
    },
    
    // 类名常量
    CLASS_NAMES: {
        ACTIVE: "active",
        HIDDEN: "hidden",
        DARK_THEME: "dark-theme"
    },
    
    // 事件常量
    EVENTS: {
        THEME_CHANGED: "theme-changed"
    }
};

// 导出配置对象
window.BlogConfig = BlogConfig;