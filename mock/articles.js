/**
 * 文章模拟数据
 * 用于开发和调试阶段
 */

window.MockArticles = [
    {
        id: 1,
        title: "JavaScript ES6+ 新特性详解",
        category: "technology",
        date: "2024-03-15",
        content: "ES6及后续版本为JavaScript带来了许多重要的新特性，包括箭头函数、模板字符串、解构赋值、Promise、async/await等。这些特性极大地提高了开发效率和代码可读性。本文将详细介绍这些新特性的使用方法、适用场景以及注意事项。",
        filePath: "technology/es6-features.md"
    },
    {
        id: 2,
        title: "Vue 3.0 组合式API入门",
        category: "technology",
        date: "2024-03-10",
        content: "Vue 3.0 引入了组合式API，这是对Vue 2.x选项式API的重大改进。组合式API提供了更好的代码组织、逻辑复用和类型支持。本文将介绍组合式API的核心概念，并通过实际示例展示如何使用setup函数、ref、reactive等新特性。",
        filePath: "technology/vue3-composition-api.md"
    },
    {
        id: 3,
        title: "使用CSS Grid构建现代布局",
        category: "technology",
        date: "2024-03-05",
        content: "CSS Grid布局是一种强大的二维布局系统，可以轻松创建复杂的网页布局。与Flexbox不同，Grid可以同时在行和列上控制元素的位置和大小。本文将通过实际案例展示如何使用Grid布局创建响应式网页设计。",
        filePath: "technology/css-grid-layout.md"
    },
    {
        id: 4,
        title: "Node.js后端开发最佳实践",
        category: "technology",
        date: "2024-02-28",
        content: "Node.js已经成为构建高性能后端服务的主流选择。本文将分享Node.js后端开发的最佳实践，包括项目结构组织、错误处理、日志记录、性能优化、安全性等方面的经验。同时，也会介绍一些常用的Node.js库和工具。",
        filePath: "technology/nodejs-best-practices.md"
    },
    {
        id: 5,
        title: "Python数据科学入门指南",
        category: "technology",
        date: "2024-02-20",
        content: "Python是数据科学领域最受欢迎的编程语言之一。本文将为初学者提供一个全面的Python数据科学入门指南，涵盖NumPy、Pandas、Matplotlib等核心库的使用方法，以及数据清洗、分析和可视化的基本流程。",
        filePath: "technology/python-data-science.md"
    },
    {
        id: 6,
        title: "Git高级技巧与工作流",
        category: "technology",
        date: "2024-02-15",
        content: "Git是现代软件开发中必不可少的版本控制工具。除了基本的add、commit、push操作外，Git还有许多高级功能可以极大提高工作效率。本文将介绍Git rebase、cherry-pick、stash等高级技巧，以及团队协作中的Git工作流。",
        filePath: "technology/git-advanced-tips.md"
    },
    {
        id: 7,
        title: "春日咖啡馆阅读时光",
        category: "life",
        date: "2024-03-18",
        content: "周末的午后，我习惯找一家安静的咖啡馆，点一杯拿铁，翻开一本纸质书。这个习惯已经持续了三年，每次都能让我从忙碌的工作中抽离出来，享受片刻的宁静。今天读的是《人类简史》，书中对人类社会发展的思考让我深受启发。",
        filePath: "life/spring-cafe-reading.md"
    },
    {
        id: 8,
        title: "学习摄影的100天记录",
        category: "life",
        date: "2024-03-12",
        content: "100天前，我买了一台二手单反相机，开始了学习摄影的旅程。从完全不懂光圈、快门、ISO，到现在能够拍出一些还算满意的照片，这个过程充满了挑战和乐趣。摄影让我学会了用不同的视角观察世界，发现了日常生活中被忽略的美好。",
        filePath: "life/100-days-photography.md"
    },
    {
        id: 9,
        title: "城市徒步：发现身边的风景",
        category: "life",
        date: "2024-03-08",
        content: "今天进行了一次城市徒步，没有明确的目的地，只是随意走走。沿着老城区的小巷，发现了许多平时开车匆匆经过时从未注意到的细节：墙角的涂鸦、老房子的建筑特色、小公园里下棋的老人。有时候，放慢脚步才能真正看到生活的模样。",
        filePath: "life/city-walking.md"
    },
    {
        id: 10,
        title: "厨房实验：自制手工披萨",
        category: "life",
        date: "2024-03-03",
        content: "周末尝试了自制手工披萨，从和面开始，到准备酱料、准备 toppings，整个过程花了三个小时。虽然不如外卖方便，但亲手制作食物的满足感是无与伦比的。烤出来的披萨卖相一般，但味道很特别，可能是因为包含了心意吧。",
        filePath: "life/homemade-pizza.md"
    },
    {
        id: 11,
        title: "重新开始写日记",
        category: "life",
        date: "2024-02-25",
        content: "受一本关于习惯养成的书启发，我决定重新开始写日记。这次不设任何格式限制，想到什么就写什么，有时候只有几句话，有时候是长篇的反思。坚持了半个月，发现写日记不仅帮助我整理思绪，也让我更清楚地看到自己的成长和变化。",
        filePath: "life/journaling-again.md"
    },
    {
        id: 12,
        title: "早起的30天挑战",
        category: "life",
        date: "2024-02-18",
        content: "我完成了30天早起挑战，每天6点起床。前10天最难，几乎每次闹钟响都想放弃。但坚持下来后，发现早上多出来的两个小时让一天变得格外充实。我用这段时间阅读、运动、规划一天的工作，效率比晚上熬夜高得多。",
        filePath: "life/early-rising-challenge.md"
    }
];