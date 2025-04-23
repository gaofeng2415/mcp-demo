import { Dom } from '../html/core.ts';

// css 工厂
class CssFactory {
  /**
   * @description rgba转hex
   * @param {object<{ r: number, g: number, b: number, a?: number }>} rgba对象
   * @returns {string} 颜色hex字符串
   */
  static rgbaToHex({ r, g, b, a = 1 }: { r: number, g: number, b: number, a?: number }): string {
    return `#${[r, g, b, a].map(c =>
      Math.round(c * 255).toString(16).padStart(2, '0')
    ).join('').toLocaleUpperCase()}`;
  }
  /**
   * @description 设置css对象
   * @param {object} dom
   */
  static createCss(dom: Dom) {
    const css = new Css();
    dom.setCss(css);
    return css;
  }
}

class Css {
  private style: Record<string, string>;
  private classList: string[];
  constructor() {
    this.style = {};
    this.classList = [];
  }
  // classList getter setter
  addClass(className: string) {
    this.classList.push(className);
    return this;
  }
  removeClass(className: string) {
    this.classList = this.classList.filter(c => c !== className);
    return this;
  }
  getClasses() {
    return this.classList;
  }
  // style getter setter
  setStyle(key: string, value: string) {
    this.style[key] = value;
    return this;
  }
  setStyles(style = {}) {
    this.style = style;
    return this;
  }
  getStyle(key: string) {
    return this.style[key];
  }
  getStyles() {
    return this.style;
  }
  /**
   * @description 获取css string
   * @todo 实现class string
   */
  toString() {
    const cssString = Object.entries(this.style)
      .map(([key, value]) => `${key}: ${value};`)
      .join(' ');
    const classString = this.classList.length > 0 ? `class="${this.classList.join(' ')}"` : '';
    return [cssString ? `style="${cssString}"` : '', classString];
  }
}

export default CssFactory;
export type { CssFactory, Css };
