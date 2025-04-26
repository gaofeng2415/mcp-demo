import hljs from 'highlight.js';
import { languageToExtension } from './enum';

/**
 * @description 下载文件
 * @param text 文件内容
 * @param filename 文件名
 */
export function downloadTextAsFile(text: string, filename: string) {
  const blob = new Blob([text], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

/**
 * @description 根据代码获取文件后缀名
 * @param code 代码
 */
export function getCodeExtension(code: string) {
  try {
    // 使用highlight.js自动检测语言
    const result = hljs.highlightAuto(code);
    const language = result.language ?? '';
    // 从映射表中获取后缀名，如果没有则返回语言本身
    return languageToExtension[language as keyof typeof languageToExtension] || language || 'txt';
  } catch (e) {
    return 'txt';
  }
}

/**
 * @description 复制到剪贴板
 * @param text 要复制的文本
 */
export async function copyToClipboard(text: string) {
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
  }
}
