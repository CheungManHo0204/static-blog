/**
 * API服务模块
 * 负责与数据源交互，提供统一的接口
 */

const ApiService = {
    /**
     * 获取所有文章
     * @returns {Promise<Array>} 文章数组
     */
    getAllArticles: async function() {
        try {
            // 先尝试从模拟数据获取
            if (window.MockArticles) {
                return Promise.resolve(window.MockArticles);
            }
            
            // 预留：未来可以替换为从服务器获取真实数据
            // const response = await fetch('/api/articles');
            // return await response.json();
            
            // 如果没有模拟数据，返回空数组
            return [];
        } catch (error) {
            console.error("获取文章列表失败:", error);
            return [];
        }
    },
    
    /**
     * 获取指定分类的文章
     * @param {string} category - 文章分类
     * @returns {Promise<Array>} 指定分类的文章数组
     */
    getArticlesByCategory: async function(category) {
        const allArticles = await this.getAllArticles();
        return allArticles.filter(article => article.category === category);
    },
    
    /**
     * 获取指定ID的文章
     * @param {string|number} id - 文章ID
     * @returns {Promise<Object|null>} 文章对象或null
     */
    getArticleById: async function(id) {
        const allArticles = await this.getAllArticles();
        return allArticles.find(article => article.id == id) || null;
    },
    
    /**
     * 获取最新文章
     * @param {number} count - 文章数量
     * @returns {Promise<Array>} 最新文章数组
     */
    getLatestArticles: async function(count = BlogConfig.DISPLAY.LATEST_ARTICLES_COUNT) {
        const allArticles = await this.getAllArticles();
        // 按日期降序排序
        const sortedArticles = allArticles.sort((a, b) => new Date(b.date) - new Date(a.date));
        return sortedArticles.slice(0, count);
    },
    
    /**
     * 获取文章分类统计
     * @returns {Promise<Object>} 分类统计对象
     */
    getCategoryStats: async function() {
        const allArticles = await this.getAllArticles();
        const stats = {};
        
        allArticles.forEach(article => {
            if (!stats[article.category]) {
                stats[article.category] = 0;
            }
            stats[article.category]++;
        });
        
        return stats;
    },
    
    /**
     * 模拟获取Markdown文件内容
     * @param {string} filePath - 文件路径
     * @returns {Promise<string>} Markdown内容
     */
    getMarkdownContent: async function(filePath) {
        try {
            // 预留：未来可以替换为从服务器获取真实的Markdown文件
            // const response = await fetch(`/articles/${filePath}`);
            // return await response.text();
            
            // 模拟返回Markdown内容
            return `# ${filePath} 的内容\n\n这是一个示例Markdown内容。在实际应用中，这里会是从服务器获取的真实Markdown文件内容。\n\n## 二级标题\n\n这是段落内容。\n\n### 代码示例\n\n\`\`\`javascript\nconsole.log("Hello, World!");\n\`\`\`\n\n## 列表示例\n\n- 列表项1\n- 列表项2\n- 列表项3\n\n> 这是一个引用块\n\n**粗体文本** 和 *斜体文本*`;
        } catch (error) {
            console.error("获取Markdown内容失败:", error);
            return `# 加载失败\n\n无法加载文章内容，请稍后重试。`;
        }
    }
};

// 导出API服务对象
window.ApiService = ApiService;