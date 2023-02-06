# Popover 气泡框

## **介绍**

常用于展示的提示气泡框。

## **代码演示**

### **基础用法**

使用 `ys-popover` 标签对内容进行包裹，配置 `content` 属性即可使用。

```tsx
<template>
	<ys-popover :content="content" >test</ys-popover>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const content = 'popover'
<script>
```

### 传入组件

`content` 除了字符串还能使用组件。

```tsx
<template>
	<ys-popover :content="content" >test</ys-popover>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
const content = reactive(<input></input>)
<script>
```

### 使用 content 插槽

还可以使用具名插槽传入展示内容，具名插槽的优先级最高

```tsx
<template>
	<ys-popover :content="content" >
		test
		<template #content>
			popover
		</template>
	</ys-popover>
</template>
```

### 指令模式

可以直接在元素上添加指令调用

```tsx
<template>
	<input v-popover.top="popover" />
</template>
```

### Popos

| 参数         | 说明                                        | 类型        | 默认值   |
| ------------ | ------------------------------------------- | ----------- | -------- | ------- | ------- | -------- |
| visible      | 用户自定义显隐，如果传入优先级最高          | boolean     | ‘’       | ‘’      |
| content      | 显示内容                                    | string      | VNode    | -       |
| placement    | 显示方位                                    | 'top'       | 'bottom' | 'left'  | 'right’ | “bottom” |
| trigger      | 切换方式                                    | 'click'     | 'hover'  | 'focus’ | “click  |
| delay        | trigger 为 hover 的情况下，关闭和展示的延迟 | number      | 500      |
| offset       | 气泡框离元素的偏移量                        | number      | 10       |
| disabled     | 是否禁用                                    | boolean     | false    |
| directiveEl  | 指令调用时的元素，会自动传入，请勿添加      | HTMLElement | -        |
| appendToBody | 添加到 body 上                              | boolean     | false    |

### Slots

| 名称    | 说明           |
| ------- | -------------- |
| default | 元素包裹的内容 |
| content | 气泡框展示内容 |
