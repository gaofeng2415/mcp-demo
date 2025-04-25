declare module '*.tsx' {
  export interface GlobalComponents {
    Icon: typeof import('@/client/components/icon/index.tsx').default
  }
}
