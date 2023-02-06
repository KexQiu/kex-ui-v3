import type { App, Plugin, Component } from 'vue';

export type SFCWithInstall<T> = T & Plugin;

export const withInstall = <T extends Component>(component: T): SFCWithInstall<T> => {
  (component as SFCWithInstall<T>).install = (app: App) => {
    app.component((component as any).name, component);
  };
  return component as SFCWithInstall<T>;
}