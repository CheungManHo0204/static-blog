/**
 * 工具函数模块
 * 包含通用的辅助函数
 */

const BlogUtils = {
    /**
     * DOM工具类
     */
    DOM: {
        /**
         * 创建元素并设置属性
         * @param {string} tag - 标签名
         * @param {object} attributes - 属性对象
         * @param {string|HTMLElement} content - 内容或子元素
         * @returns {HTMLElement} 创建的元素
         */
        createElement: function(tag, attributes = {}, content = null) {
            const element = document.createElement(tag);
            
            // 设置属性
            for (const [key, value] of Object.entries(attributes)) {
                if (key === "className") {
                    element.className = value;
                } else if (key === "textContent") {
                    element.textContent = value;
                } else if (key.startsWith("data-")) {
                    element.setAttribute(key, value);
                } else {
                    element[key] = value;
                }
            }
            
            // 设置内容
            if (content) {
                if (typeof content === "string") {
                    element.innerHTML = content;
                } else if (content instanceof HTMLElement) {
                    element.appendChild(content);
                } else if (Array.isArray(content)) {
                    content.forEach(child => {
                        if (child instanceof HTMLElement) {
                            element.appendChild(child);
                        }
                    });
                }
            }
            
            return element;
        },
        
        /**
         * 清空元素内容
         * @param {HTMLElement} element - 要清空的元素
         */
        clearElement: function(element) {
            while (element.firstChild) {
                element.removeChild(element.firstChild);
            }
        },
        
        /**
         * 切换元素显示/隐藏
         * @param {HTMLElement} element - 要切换的元素
         * @param {boolean} show - 是否显示
         */
        toggleElement: function(element, show) {
            element.style.display = show ? "block" : "none";
        }
    },
    
    /**
     * 日期工具类
     */
    DateUtils: {
        /**
         * 格式化日期为可读字符串
         * @param {string|Date} dateString - 日期字符串或Date对象
         * @returns {string} 格式化后的日期
         */
        formatDate: function(dateString) {
            const date = new Date(dateString);
            return date.toLocaleDateString("zh-CN", {
                year: "numeric",
                month: "long",
                day: "numeric"
            });
        },
        
        /**
         * 获取相对时间描述（如"2天前"）
         * @param {string|Date} dateString - 日期字符串或Date对象
         * @returns {string} 相对时间描述
         */
        getRelativeTime: function(dateString) {
            const date = new Date(dateString);
            const now = new Date();
            const diffMs = now - date;
            const diffSec = Math.floor(diffMs / 1000);
            const diffMin = Math.floor(diffSec / 60);
            const diffHour = Math.floor(diffMin / 60);
            const diffDay = Math.floor(diffHour / 24);
            
            if (diffDay > 30) {
                const diffMonth = Math.floor(diffDay / 30);
                if (diffMonth > 12) {
                    const diffYear = Math.floor(diffMonth / 12);
                    return `${diffYear}年前`;
                }
                return `${diffMonth}个月前`;
            } else if (diffDay > 0) {
                return `${diffDay}天前`;
            } else if (diffHour > 0) {
                return `${diffHour}小时前`;
            } else if (diffMin > 0) {
                return `${diffMin}分钟前`;
            } else {
                return "刚刚";
            }
        }
    },
    
    /**
     * 字符串工具类
     */
    StringUtils: {
        /**
         * 截断字符串并添加省略号
         * @param {string} str - 原始字符串
         * @param {number} maxLength - 最大长度
         * @returns {string} 截断后的字符串
         */
        truncate: function(str, maxLength) {
            if (!str || str.length <= maxLength) return str;
            return str.substring(0, maxLength) + "...";
        },
        
        /**
         * 从Markdown内容中提取纯文本摘要
         * @param {string} markdown - Markdown内容
         * @param {number} maxLength - 最大长度
         * @returns {string} 提取的纯文本摘要
         */
        extractSummaryFromMarkdown: function(markdown, maxLength) {
            // 移除Markdown标记
            let plainText = markdown
                .replace(/[#*`\[\]]/g, "")  // 移除标题、列表、代码等标记
                .replace(/\n+/g, " ")       // 将换行符替换为空格
                .replace(/\s+/g, " ")       // 合并多个空格
                .trim();
            
            // 截断到指定长度
            return this.truncate(plainText, maxLength);
        }
    },
    
    /**
     * 主题工具类
     */
    ThemeUtils: {
        /**
         * 获取当前主题
         * @returns {string} 当前主题 ('light' 或 'dark')
         */
        getCurrentTheme: function() {
            const savedTheme = localStorage.getItem(BlogConfig.STORAGE_KEYS.THEME);
            if (savedTheme) return savedTheme;
            
            // 检查系统偏好
            const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
            return prefersDark ? "dark" : "light";
        },
        
        /**
         * 设置主题
         * @param {string} theme - 主题名称 ('light' 或 'dark')
         */
        setTheme: function(theme) {
            document.documentElement.setAttribute("data-theme", theme);
            localStorage.setItem(BlogConfig.STORAGE_KEYS.THEME, theme);
            
            // 触发自定义事件
            document.dispatchEvent(new CustomEvent(BlogConfig.EVENTS.THEME_CHANGED, { detail: theme }));
        },
        
        /**
         * 切换主题（亮暗切换）
         */
        toggleTheme: function() {
            const currentTheme = this.getCurrentTheme();
            const newTheme = currentTheme === "light" ? "dark" : "light";
            this.setTheme(newTheme);
            return newTheme;
        }
    },
    
    /**
     * 存储工具类
     */
    StorageUtils: {
        /**
         * 安全获取本地存储数据
         * @param {string} key - 存储键名
         * @param {any} defaultValue - 默认值
         * @returns {any} 存储的值或默认值
         */
        get: function(key, defaultValue = null) {
            try {
                const item = localStorage.getItem(key);
                return item ? JSON.parse(item) : defaultValue;
            } catch (error) {
                console.error("读取本地存储失败:", error);
                return defaultValue;
            }
        },
        
        /**
         * 安全设置本地存储数据
         * @param {string} key - 存储键名
         * @param {any} value - 要存储的值
         */
        set: function(key, value) {
            try {
                localStorage.setItem(key, JSON.stringify(value));
            } catch (error) {
                console.error("写入本地存储失败:", error);
            }
        }
    }
};

// 导出工具对象
window.BlogUtils = BlogUtils;