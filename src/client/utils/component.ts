import type { App, Plugin } from 'vue';

type SFCWithInstall<T> = T & Plugin

// 封装 install 方法
export const withInstall = <T, U extends Record<string, any>>(
  main: T,
  extra?: U
) => {
  (main as SFCWithInstall<T>).install = (app: App) => {
    for (const comp of [main, ...Object.values(extra ?? {})]) {
      app.component(comp.name, comp)
    }
    if (extra) {
      for (const [key, comp] of Object.entries(extra)) {
        app.component(key, comp)
      }
    }
  }
  return main as SFCWithInstall<T> & U
}
