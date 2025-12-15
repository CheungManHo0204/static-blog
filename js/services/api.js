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
            // 方案1：尝试从本地服务器读取（开发环境）
            const localUrl = `./assets/articles/${filePath}`;
            console.log('📄 尝试从本地读取:', localUrl);
            
            const response = await fetch(localUrl);
            
            if (response.ok) {
                const markdown = await response.text();
                console.log('✅ 成功读取本地文件，长度:', markdown.length);
                return markdown;
            }
            
            // 方案2：如果本地读取失败，尝试从GitHub读取（部署环境）
            const githubRawUrl = `https://raw.githubusercontent.com/CheungManHo0204/static-blog/main/articles/${filePath}`;
            console.log('尝试从GitHub读取:', githubRawUrl);
            
            const githubResponse = await fetch(githubRawUrl);
            if (githubResponse.ok) {
                const markdown = await githubResponse.text();
                console.log('✅ 成功从GitHub读取');
                return markdown;
            }
            
            // 方案3：都失败时返回示例内容
            console.warn('❌ 无法读取文件，使用示例内容');
            return this.getFallbackContent(filePath);
            
        } catch (error) {
            console.error('获取Markdown内容失败:', error);
            return this.getFallbackContent(filePath);
        }
    },

    // 添加回退内容函数
    getFallbackContent: function(filePath) {
        const filename = filePath.split('/').pop().replace('.md', '');
        return `# ${filename}

    > 这是一个示例内容，因为无法读取实际文件。

    ## 为什么显示这个？

    实际文件 \`${filePath}\` 无法被读取。可能的原因：

    1. 文件不存在或路径错误
    2. 服务器配置问题
    3. CORS限制

    ## 测试代码块

    \`\`\`javascript
    console.log("测试代码块");
    \`\`\`

    ## 测试列表
    - 项目1
    - 项目2
    - 项目3

    > 请检查控制台获取更多信息。`;
    }
    };

// 导出API服务对象
window.ApiService = ApiService;