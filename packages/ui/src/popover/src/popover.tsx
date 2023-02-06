import type { ComputedRef, Ref } from 'vue'
import {
  computed,
  defineComponent,
  onMounted,
  reactive,
  ref,
  Teleport,
  unref,
  watch,
} from 'vue'
import { createPopper } from '@popperjs/core'
import {
  onClickOutside,
  useElementBounding,
  useElementVisibility,
  useEventListener,
} from '@vueuse/core'
import { useNamespace } from '../../composables/use-namespace'
import ScrollView from '../../scroll-view/ScrollView.vue'
import { popoverProps } from './props'
import type { PopoverTrigger, IPopoverProps } from './types'

import './popover.scss'

if (!document.querySelector('#popovers-wrap')) {
  const wrap = document.createElement('div')
  wrap.id = 'popovers-wrap'
  document.body.appendChild(wrap)
}
const ns = useNamespace('popover')
export default defineComponent({
  name: ns.cmpName,
  props: popoverProps,
  emits: ['hide', 'show'],
  setup(props, { emit, slots, expose, attrs }) {
    // 自带显隐
    const autoVisible = ref(false)
    // 具体控制的显隐 优先级 props.visible > autoVisible.value
    const visible: ComputedRef<boolean> = computed(() => {
      if (props.disabled) return false
      if (props.visible === '') {
        return autoVisible.value
      } else {
        return props.visible
      }
    })

    const triggerMethods = computed(() =>
      ([] as Array<PopoverTrigger>).concat(props.trigger)
    )

    // 切换显隐 只能切换autoVisible
    const toggleVisible: (value?: boolean) => void = (value?) => {
      if (value === void 0) {
        autoVisible.value = !autoVisible.value
      } else {
        autoVisible.value = value
      }
    }
    // 防抖切换
    const debounceToggleVisible: (value?: boolean) => void = (() => {
      let timer: number

      return (value?: boolean) => {
        if (timer) {
          clearTimeout(timer)
          timer = window.setTimeout(() => {
            toggleVisible(value)
            clearTimeout(timer)
          }, props.delay)
        } else {
          timer = window.setTimeout(() => {
            toggleVisible(value)
            clearTimeout(timer)
          }, props.delay)
        }
      }
    })()

    // 鼠标移入事件
    const onMouseenter = () => {
      triggerMethods.value.includes('hover') && debounceToggleVisible(true)
    }
    // 鼠标移出事件
    const onMouseleave = () => {
      triggerMethods.value.includes('hover') && debounceToggleVisible(false)
    }
    // 点击事件
    const onClick = () => {
      if (!triggerMethods.value.includes('click')) return
      if (visible.value) {
        toggleVisible(false)
      } else {
        toggleVisible(true)
      }
    }
    // 聚焦事件
    const onFocusin = () => {
      triggerMethods.value.includes('focus') && debounceToggleVisible(true)
    }
    // 失焦事件
    const onFocusout = () => {
      // triggerMethods.value.includes('focus') && debounceToggleVisible(false)
    }
    // 注册事件
    const registerEvent = () => {
      if (props.triggerEl) return
      useEventListener(triggerRef.value!, 'mouseenter', onMouseenter)
      useEventListener(triggerRef.value!, 'mouseleave', onMouseleave)
      useEventListener(triggerRef.value!, 'click', onClick)
      useEventListener(triggerRef.value!, 'focusin', onFocusin)
      useEventListener(triggerRef.value!, 'focusout', onFocusout)
    }

    // html元素
    const triggerRef: Ref = ref()
    const contentRef: Ref = ref()
    const arrowRef: Ref = ref()
    const triggerRect = reactive(useElementBounding(triggerRef))

    // 点击外部隐藏
    onClickOutside(contentRef, () => toggleVisible(false), {
      ignore: [triggerRef],
    })
    // 触发器是否可见
    const triggerVisibility = useElementVisibility(triggerRef)
    watch(
      () => triggerVisibility.value,
      (val) => {
        if (!val && visible.value) {
          toggleVisible(false)
        }
      }
    )

    // 气泡框样式
    const contentStyle: ComputedRef<Record<string, any>> = computed(() => {
      const style = {} as any
      ;['width', 'maxWidth', 'minWidth', 'maxHeight'].forEach((e) => {
        const key = e as keyof IPopoverProps
        if (props[key]) {
          switch (props[key]) {
            case 'auto':
              break
            case 'followWrap':
              style[key] = triggerRect.width + 'px'
              break
            default:
              style[key] = props[key] + 'px'
          }
        }
      })
      return style
    })
    // 气泡框类名
    const contentClass = ref<string[]>([ns.e('content'), attrs.class as string])
    const removeClass = (className: string) => {
      const index = contentClass.value.findIndex((e) => e === className)
      if (index !== -1) {
        contentClass.value.splice(index, 1)
      }
    }
    watch(
      () => visible.value,
      (value) => {
        if (value) {
          if (props.destroyOnClose) {
            showContent.value = true
            if (destroyTimeout) clearTimeout(destroyTimeout)
          }
          updatePopover()
          removeClass(ns.is('hidden'))
          contentClass.value.push(ns.is('show'))
          emit('show')
        } else {
          removeClass(ns.is('show'))
          contentClass.value.push(ns.is('hidden'))
          emit('hide')
          if (props.destroyOnClose) delayDestroy()
        }
      }
    )

    // destroy content
    const showContent: Ref<boolean> = ref(!props.destroyOnClose)
    let destroyTimeout: number
    const delayDestroy = () => {
      if (destroyTimeout) clearTimeout(destroyTimeout)
      if (props.destroyOnClose) {
        // @ts-ignore
        destroyTimeout = setTimeout(() => {
          showContent.value = false
          clearTimeout(destroyTimeout)
        }, 500)
      }
    }

    const scrollStyle: ComputedRef = computed(() => {
      return {
        maxHeight:
          typeof props.maxHeight === 'number'
            ? props.maxHeight - 10 + 'px'
            : false,
      }
    })

    // popover实例
    const popoverInstanceRef = ref()
    const popoverOptions = computed(() => ({
      placement: props.placement,
      // strategy: 'fixed',
      modifiers: [
        { name: 'offset', options: { offset: [0, props.offset] } },
        { name: 'flip', options: { padding: 10, boundary: document.body } },
        {
          name: 'preventOverflow',
          options: { padding: 10, boundary: document.body },
        },
        {
          name: 'arrow',
          enabled: props.showArrow,
          options: {
            element: arrowRef.value,
            padding: 8,
          },
        },
      ],
    }))
    const createPopoverInstance = (
      triggerEl: HTMLElement,
      contentEl: HTMLElement
    ) => {
      // @ts-ignore
      return createPopper(triggerEl, contentEl, popoverOptions.value)
    }

    const updatePopover = () => unref(popoverInstanceRef)?.update()
    const setPopoverOptions = () =>
      unref(popoverInstanceRef)?.setOptions(popoverOptions.value)

    watch(() => props, setPopoverOptions, { deep: true })

    onMounted(() => {
      let updateHandle: () => any
      watch(
        () => triggerRef.value,
        (triggerEl) => {
          registerEvent()
          updateHandle?.()
          const popoverInstance = unref(popoverInstanceRef)
          popoverInstance?.destroy?.()
          if (triggerEl) {
            const contentEl: HTMLElement = unref(contentRef)!
            popoverInstanceRef.value = createPopoverInstance(
              triggerEl,
              contentEl
            )

            updateHandle = watch(
              () => triggerEl.getBoundingClientRect(),
              updatePopover,
              {
                immediate: true,
              }
            )
          } else {
            popoverInstanceRef.value = undefined
          }
        },
        {
          immediate: true,
        }
      )
    })

    expose({
      hide: () => toggleVisible(false),
      show: () => toggleVisible(true),
      toggle: () => toggleVisible(),
      isVisible: visible,
    })

    const renderContent = () => (
      <ScrollView class={ns.e('scroll-view')} style={scrollStyle.value}>
        {slots.content?.() || props.content}
      </ScrollView>
    )

    return () => (
      <div class={ns.b()}>
        <div ref={triggerRef} class={ns.e('trigger')}>
          {slots.default?.()}
        </div>
        <Teleport to="#popovers-wrap" disabled={!props.appendToBody}>
          <div
            onMouseenter={onMouseenter}
            onMouseleave={onMouseleave}
            ref={contentRef}
            class={contentClass.value}
            style={contentStyle.value}
          >
            {showContent.value && renderContent()}
            {props.showArrow && <div ref={arrowRef} class={ns.e('arrow')} />}
          </div>
        </Teleport>
      </div>
    )
  },
})
