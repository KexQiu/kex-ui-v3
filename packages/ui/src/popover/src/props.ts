import { PropType, VNode } from 'vue';
import {
  PopoverMaxHeight,
  PopoverPlacement,
  PopoverTrigger,
  PopoverWidth,
} from './types';

export const popoverProps = {
  visible: {
    type: [String, Boolean] as PropType<'' | boolean>,
    default: '',
  },
  content: {
    type: [String, Object] as PropType<string | VNode>,
  },
  placement: {
    type: String as PropType<PopoverPlacement>,
    default: 'bottom',
  },
  trigger: {
    type: String as PropType<PopoverTrigger>,
    default: 'click',
  },
  delay: {
    type: Number,
    default: 100,
  },
  offset: {
    type: Number,
    default: 10,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  triggerEl: {
    type: [Boolean, Object] as PropType<false | HTMLElement>,
    default: false,
  },
  appendToBody: {
    type: Boolean,
    default: true,
  },
  showArrow: {
    type: Boolean,
    default: true,
  },
  width: {
    type: [Number, String] as PropType<PopoverWidth>,
    default: 'auto',
  },
  minWidth: {
    type: [Number, String] as PropType<PopoverWidth>,
    default: 'auto',
  },
  maxWidth: {
    type: [Number, String] as PropType<PopoverWidth>,
    default: 'auto',
  },
  maxHeight: {
    type: [Number, String] as PropType<PopoverMaxHeight>,
    default: 'auto',
  },
  destroyOnClose: {
    type: Boolean,
    default: true,
  },
  araiId: {
    type: [Number, String],
    default: new Date().valueOf(),
  },
};
