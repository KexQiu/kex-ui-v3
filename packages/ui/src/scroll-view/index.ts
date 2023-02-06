import { withInstall } from '../utils';
import type { Component } from 'vue';
import _ScrollView from './ScrollView.vue';

export const ScrollView: Component = withInstall(_ScrollView);
export default ScrollView;
declare module 'vue' {
  export interface GlobalComponents {
    ScrollView: typeof ScrollView;
  }
}
