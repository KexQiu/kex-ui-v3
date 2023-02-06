import { VNode, ExtractPropTypes } from 'vue'
import { popoverProps } from './props'

export type PopoverPlacement = 'top' | 'bottom' | 'left' | 'right'
export type PopoverTrigger = 'click' | 'hover' | 'focus'
export type PopoverWidth = 'auto' | 'followWrap' | number
export type PopoverMaxHeight = 'auto' | number

export type IPopoverProps = ExtractPropTypes<typeof popoverProps>
