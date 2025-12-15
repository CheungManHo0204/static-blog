# React Hooks 基础教程

# 什么是 React Hooks？

React Hooks 是 React 16.8 版本引入的新特性，它允许你在不编写 class 的情况下使用 state 和其他 React 特性。

# 基础 Hook

## useState

useState 是最基本的 Hook，用于在函数组件中添加状态。

代码示例：

```jsx
import React, { useState } from 'react';

function Counter() {

	const [count, setCount] = useState(0);
	
	return (
		<div>
			<p>当前计数: {count}</p>
			<button onClick={() => setCount(count + 1)}>
				增加
			</button>
		</div>
	);
}
```

## useEffect

seEffect 用于处理副作用，比如数据获取、订阅等。

代码示例：

```jsx
import React, { useState, useEffect } from 'react';

function DataFetcher() {

	const [data, setData] = useState(null);
	
	const [loading, setLoading] = useState(true);
	
	useEffect(() => {
	
		fetch('/api/data')
		
		.then(response => response.json())
		
		.then(data => {
		
		setData(data);
		
		setLoading(false);
	
	});

}, []);

if (loading) return <div>加载中...</div>;

	return <div>{JSON.stringify(data)}</div>;

}
```

# 使用规则

1. 只在最顶层使用 Hook
    - 不要在循环、条件或嵌套函数中调用 Hook
2. 只在 React 函数中调用 Hook
    - 在 React 函数组件中调用 Hook
    - 在自定义 Hook 中调用其他 Hook

# 常见问题

- Q: 什么时候使用 useMemo？
A: 当有昂贵的计算需要缓存时使用。
- Q: useCallback 和 useMemo 的区别？
A: useCallback 缓存函数，useMemo 缓存值。