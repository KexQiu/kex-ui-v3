# Scroll View 滚动容器

### 介绍

滚动容器是一种常见的视图，用于在内容超出视图框时提供滚动功能。此组件推荐用于一般的滚动场景，如列表、表单等。如果是滚动加载大量的数据，请使用 [Virtual List](#/virtual-list) 组件。

## 代码演示

### 基础用法

通过指定组件给 `scroll-view` 组件，一个固定高度的类，即可实现竖向滚动，通过监听事件，来判断当前容器处于什么状态

```ts
<template>
  <div class="section">
    <div>
      <ScrollView
        ref="scrollsRef"
        class="demo1"
        target="self"
        @scrolling="onScrollIng"
        @scrolltoupper="onScrollToUpper"
        @scrolltolower="onScrollToLower"
      >
        <div class="item" v-for="i in 100">{{ i }}</div>
      </ScrollView>
    </div>
    <button class="btn" style="margin-top: 20px" @click="handleScrollTo">
      scrollTo 400px
    </button>
    <div class="scrollinfo">
      <div>是否在滚动：{{ isScrolling }}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const isScrolling = ref(false)
const onScrollIng = (e) => {
  isScrolling.value = e.isScrolling
  x.value = e.x
  y.value = e.y
}

const onScrollToUpper = () => {
  // console.log('滚动到顶部')
  nextTick(()=>{
    alert('滚动到顶部')
  })
}

const onScrollToLower = () => {
  // console.log('滚动到底部')
  nextTick(()=>{
    alert('滚动到底部')
  })
}

const scrollsRef = ref(null)
const handleScrollTo = () => {
  scrollsRef?.value.scrollTo(400)
}
</script>
<style lang="scss" scoped>
.section {
  width: 80vw;
  margin: 0 auto;
  padding-top: 20px;
}
.demo1 {
  width: 100%;
  height: 400px;
  .item {
    width: 100%;
    height: 100px;
    background: #e5e5e5;
    border-bottom: 1px solid #ccc;
    flex-shrink: 0;
  }
}

</style>

```

### 横向滚动

设置`direction="horizontal"`属性，设置滚动方向为横向，同时组件的样式也要满足能够横向滚动

```ts
<template>
  <div class="section">
    <div>
      <ScrollView
        ref="scrollsRef"
        class="demo2"
        target="self"
        direction="horizontal"
        @scrolling="onScrollIng"
        @scrolltoupper="onScrollToUpper"
        @scrolltolower="onScrollToLower"
      >
        <div class="item" v-for="i in 100">{{ i }}</div>
      </ScrollView>
    </div>
    <button class="btn" style="margin-top: 20px" @click="handleScrollTo">
      scrollTo 400px
    </button>
    <div class="scrollinfo">
      <div>是否在滚动：{{ isScrolling }}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const isScrolling = ref(false)
const onScrollIng = (e) => {
  isScrolling.value = e.isScrolling
  x.value = e.x
  y.value = e.y
}

const onScrollToUpper = () => {
  // console.log('滚动到顶部')
  nextTick(()=>{
    alert('滚动到左边')
  })
}

const onScrollToLower = () => {
  // console.log('滚动到底部')
  nextTick(()=>{
    alert('滚动到右部')
  })
}

const scrollsRef = ref(null)
const handleScrollTo = () => {
  scrollsRef?.value.scrollTo(400)
}
</script>
<style lang="scss" scoped>
.section {
  width: 80vw;
  margin: 0 auto;
  padding-top: 20px;
}
.demo2{
  width: 400px;
  height: 100px;
  overflow-x: auto;
  display: flex;
  .item {
    width: 100px;
    height: 100%;
    background: #e5e5e5;
    border-right: 1px solid #ccc;
    flex-shrink: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}


</style>

```

### pageMode

当需要滚动的是 window 的滚动条时，可以使用`target="window"`属性
如果是在 nuxt 项目中使用 请使用`<ClientOnly>`包裹组件

```ts
<template>
  <div class="section">
    <div>
      <ScrollView
        ref="scrollsRef"
        class="demo3"
        target="window"
        @scrolling="onScrollIng"
        @scrolltoupper="onScrollToUpper"
        @scrolltolower="onScrollToLower"
      >
        <div class="item" v-for="i in 100">{{ i }}</div>
      </ScrollView>
    </div>
    <button class="btn" style="margin-top: 20px" @click="handleScrollTo">
      scrollTo 400px
    </button>
    <div class="scrollinfo">
      <div>是否在滚动：{{ isScrolling }}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const isScrolling = ref(false)
const onScrollIng = (e) => {
  isScrolling.value = e.isScrolling
  x.value = e.x
  y.value = e.y
}

const onScrollToUpper = () => {
  // console.log('滚动到顶部')
  nextTick(()=>{
    alert('滚动到左边')
  })
}

const onScrollToLower = () => {
  // console.log('滚动到底部')
  nextTick(()=>{
    alert('滚动到右部')
  })
}

const scrollsRef = ref(null)
const handleScrollTo = () => {
  scrollsRef?.value.scrollTo(400)
}
</script>
<style lang="scss" scoped>
.section {
  width: 80vw;
  margin: 0 auto;
  padding-top: 20px;
}
.demo3 {
  width: 100%;
  .item {
    width: 100%;
    height: 100px;
    background: #e5e5e5;
    border-bottom: 1px solid #ccc;
    flex-shrink: 0;
  }
}


</style>

```

### Props

| 参数           | 说明                                         | 类型    | 默认值   |
| -------------- | -------------------------------------------- | ------- | -------- |
| target         | 滚动的目标元素，可选值为`self`或`window`     | string  | self     |
| direction      | 滚动的方向，可选值为`vertical`或`horizontal` | string  | vertical |
| upperThreshold | 距离顶部/左边多远时，触发 scrolltoupper 事件 | number  | 0        |
| lowerThreshold | 距离底部/右边多远时，触发 scrolltolower 事件 | number  | 0        |
| scrollBar      | 是否显示滚动条                               | boolean | true     |

### Events

| 事件名        | 说明                  | 回调参数        |
| ------------- | --------------------- | --------------- |
| scrolling     | 滚动时触发            | {boolean, x, y} |
| scrolltoupper | 滚动到顶部/左边时触发 | -               |
| scrolltolower | 滚动到底部/右边时触发 | -               |

### Methods

| 方法名   | 说明           | 参数   |
| -------- | -------------- | ------ |
| scrollTo | 滚动到指定位置 | number |

## Slot

| name   | 说明           |
| ------ | -------------- |
| -      | 自定义内容     |
| footer | 自定义底部内容 |
| header | 自定义头部内容 |
