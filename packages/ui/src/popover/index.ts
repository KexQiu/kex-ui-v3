import { withInstall } from '../utils'
import type { Component } from 'vue'
import _Popover from './src/popover'

export const Popover: Component = withInstall(_Popover)
export default Popover
declare module 'vue' {
  export interface GlobalComponents {
    Popover: typeof Popover
  }
}