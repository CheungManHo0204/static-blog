/**
 * 博客数据管理模块
 * 负责管理博客文章数据和状态
 */

const BlogManager = {
    // 当前状态
    currentState: {
        page: BlogConfig.PAGE_TYPES.HOME,
        category: null,
        currentArticle: null
    },
    
    /**
     * 初始化博客管理器
     */
    init: function() {
        console.log("博客管理器初始化完成");
    },
    
    /**
     * 设置当前页面
     * @param {string} page - 页面类型
     * @param {string} category - 分类（可选）
     */
    setCurrentPage: function(page, category = null) {
        this.currentState.page = page;
        this.currentState.category = category;
        this.currentState.currentArticle = null;
        
        // 更新导航栏激活状态
        this.updateNavigation();
    },
    
    /**
     * 设置当前文章
     * @param {Object} article - 文章对象
     */
    setCurrentArticle: function(article) {
        this.currentState.currentArticle = article;
    },
    
    /**
     * 获取当前状态
     * @returns {Object} 当前状态对象
     */
    getCurrentState: function() {
        return { ...this.currentState };
    },
    
    /**
     * 更新导航栏激活状态
     */
    updateNavigation: function() {
        const navLinks = document.querySelectorAll(".nav-link");
        navLinks.forEach(link => {
            link.classList.remove(BlogConfig.CLASS_NAMES.ACTIVE);
            
            const page = link.getAttribute("data-page");
            if (page === this.currentState.page) {
                link.classList.add(BlogConfig.CLASS_NAMES.ACTIVE);
            }
        });
    },
    
    /**
     * 根据分类获取分类名称
     * @param {string} category - 分类标识
     * @returns {string} 分类名称
     */
    getCategoryName: function(category) {
        const categoryNames = {
            [BlogConfig.ARTICLE_CATEGORIES.TECHNOLOGY]: "技术文章",
            [BlogConfig.ARTICLE_CATEGORIES.LIFE]: "生活随笔"
        };
        
        return categoryNames[category] || "未分类";
    },
    
    /**
     * 根据分类获取图标
     * @param {string} category - 分类标识
     * @returns {string} 图标HTML
     */
    getCategoryIcon: function(category) {
        const categoryIcons = {
            [BlogConfig.ARTICLE_CATEGORIES.TECHNOLOGY]: '<i class="fas fa-code"></i>',
            [BlogConfig.ARTICLE_CATEGORIES.LIFE]: '<i class="fas fa-heart"></i>'
        };
        
        return categoryIcons[category] || '<i class="fas fa-file"></i>';
    }
};

// 导出博客管理器对象
window.BlogManager = BlogManager;