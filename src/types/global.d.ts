// 扩展 global 类型定义
declare global {
  var config: Record<string, any>; // 定义全局变量 config 的类型
  interface Window {
    $bar: any
    $modal: any
    $dialog: any
    $notify: any
    $message: any
  }
}

export {};
