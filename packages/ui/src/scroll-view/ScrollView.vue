<!--
 * @Author: zhuxiaodong
 * @Date: 2022-11-15 10:45:47
 * @Description: scroll-view 组件
-->
<script lang="ts">
import { useNamespace } from '../composables/use-namespace'

const ns = useNamespace('popover')
export default {
  name: ns.cmpName,
}
</script>
<script lang="ts" setup>
import { ref, watch, toRefs, computed } from 'vue'
import { useScroll } from '@vueuse/core'
interface ScrollViewProps {
  direction?: 'vertical' | 'horizontal' //滚动方向
  upperThreshold?: number //距离顶部/左边多远时，触发 scrolltoupper 事件
  lowerThreshold?: number //距离底部/右边多远时，触发 scrolltolower 事件
  target?: 'window' | 'self' //滚动条所在的区域
  scorllBar?: boolean //是否显示滚动条
}
// Props
const props = withDefaults(defineProps<ScrollViewProps>(), {
  direction: 'vertical',
  upperThreshold: 0,
  lowerThreshold: 0,
  target: 'self',
  scorllBar: true,
})
// Emits
const emits = defineEmits(['scrolling', 'scrolltoupper', 'scrolltolower'])

// Refs
const scrollRef = ref<HTMLElement | null>(null)

const scrollBar = computed(() => {
  if (props.scorllBar) {
    return `k-scrollView__scrollbar--${props.direction}`
  }
})

const calcOffset = () => {
  const { direction, upperThreshold, lowerThreshold } = props

  return direction === 'vertical'
    ? {
        top: upperThreshold,
        bottom: lowerThreshold,
      }
    : {
        left: upperThreshold,
        right: lowerThreshold,
      }
}

const offset = calcOffset()
const { x, y, isScrolling, arrivedState } = useScroll(
  props.target === 'window' ? document : scrollRef,
  {
    offset,
    behavior: 'smooth',
  }
)

const { left, right, top, bottom } = toRefs(arrivedState)

watch(
  () => isScrolling.value,
  (val) => {
    emits('scrolling', { isScrolling: val, x: x.value, y: y.value })
  }
)
watch(
  () => top.value,
  (val) => {
    if (props.direction === 'vertical' && val) {
      emits('scrolltoupper')
    }
  }
)
watch(
  () => bottom.value,
  (val) => {
    if (props.direction === 'vertical' && val) {
      emits('scrolltolower')
    }
  }
)
watch(
  () => left.value,
  (val) => {
    if (props.direction === 'horizontal' && val) {
      emits('scrolltoupper')
    }
  }
)
watch(
  () => right.value,
  (val) => {
    if (props.direction === 'horizontal' && val) {
      emits('scrolltolower')
    }
  }
)

const scrollTo = (value: number) => {
  if (props.target === 'window') {
    if (props.direction === 'vertical') {
      window.scrollTo({
        top: value,
        left: 0,
        behavior: 'smooth',
      })
    } else {
      window.scrollTo({
        top: 0,
        left: value,
        behavior: 'smooth',
      })
    }
  } else {
    if (props.direction === 'vertical') {
      y.value = value
    } else {
      x.value = value
    }
  }
}
defineExpose({
  scrollTo,
})
</script>

<template>
  <div ref="scrollRef" :class="`k-scrollView__wrapper`">
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
.k-scrollView__wrapper {
  width: 100%;
  overflow: auto;
  &::-webkit-scrollbar {
    width: .3rem;
    height:.3rem
  }
  /* Track */
  &::-webkit-scrollbar-track {
    border-radius: .3rem;
  }
  /* Handle */
  &::-webkit-scrollbar-thumb {
    background: rgba(102, 102, 102, 0.3);
    border-radius: .3rem;
    transition: all 0.2s ease-in-out;
  }
  /* Handle on hover */
  &::-webkit-scrollbar-thumb:hover {
    cursor: pointer;
    background: rgba(102, 102, 102, 0.3);
  }
}
</style>
