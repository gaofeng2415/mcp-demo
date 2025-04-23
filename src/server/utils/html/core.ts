import type { Css } from '../css/core';

// dom 工厂
export default class DomFactory {
  static createDom(tagName: string) {
    const dom = new Dom(tagName);
    return dom;
  }
  static createFragment() {
    return document.createDocumentFragment();
  }
  static createIndent(indentNum = 0) {
    return '  '.repeat(indentNum);
  }
}

type PlainObject = Record<string, any>;

export class Dom {
  private tagName: string;
  private attributes: PlainObject;
  private children: Dom[];
  private textContent: string;
  private dataset: PlainObject;
  private parentNode: Dom | null;
  private css?: Css;
  constructor(tagName?: string, attributes?: PlainObject, children?: Dom[], textContent?: string, dataset?: PlainObject, parentNode?: Dom) {
    this.tagName = tagName ?? 'div';
    this.attributes = attributes || {};
    this.children = children || [];
    this.textContent = textContent || '';
    // this.events = {};
    this.dataset = dataset || {};
    this.parentNode = parentNode || null;
  }
  // attributes getter setter
  setAttributes(attributes = {}) {
    this.attributes = { ...this.attributes, ...attributes };
    return this;
  }
  setAttribute(name: string, value: string) {
    this.attributes[name] = value;
    return this;
  }
  getAttribute(name: string) {
    return this.attributes[name];
  }
  removeAttribute(name: string) {
    delete this.attributes[name];
    return this;
  }
  // children getter setter
  appendChild(child: Dom | Dom[]) {
    if (Array.isArray(child)) {
      this.children = this.children.concat(child);
    } else {
      this.children.push(child);
    }
    return this;
  }
  removeChild(child: Dom) {
    this.children = this.children.filter(c => c !== child);
    return this;
  }
  // textContent getter setter
  setText(text: string) {
    this.textContent = text;
    return this;
  }
  getText() {
    return this.textContent;
  }
  // dataset getter setter
  setDataset(key: string, value: string) {
    this.dataset[key] = value;
    return this;
  }
  getDataset(key: string) {
    return this.dataset[key];
  }
  removeDataset(key: string) {
    delete this.dataset[key];
    return this;
  }
  // parentNode getter setter
  setParentNode(node: Dom) {
    this.parentNode = node;
    return this;
  }
  getParentNode() {
    return this.parentNode;
  }

  setCss(css: Css) {
    this.css = css;
    return this;
  }
  getCss() {
    return this.css;
  }
  // attribute to string
  attributesToString() {
    return Object.entries(this.attributes).map(([key, value]) => `${key}="${value}"`).join(' ');
  }
  // dataset to string
  datasetToString() {
    return Object.entries(this.dataset).map(([key, value]) => `data-${key}="${value}"`).join(' ');
  }
  // css to string
  cssToString() {
    return this?.css?.toString?.()?.filter(Boolean).join(' ') || '';
  }
  /**
   * @description: 获取DOM string
   * @returns {string} DOM string
   */
  toString(indentStart = 0): string {
    const indent = DomFactory.createIndent(indentStart);
    const startList = [this.attributesToString(), this.datasetToString(), this.cssToString()].filter(Boolean).join(' ');
    const tagStart = `${indent}<${this.tagName} ${startList}>\n`;
    const tagEnd = `${indent}</${this.tagName}>\n`;
    const ans = [tagStart]
    this.textContent && ans.push(`${DomFactory.createIndent(indentStart + 1)}${this.textContent}\n`);
    if (this.children?.length > 0) {
      this.children.forEach((child) => {
        const childString = child.toString(indentStart + 1);
        ans.push(childString);
      })
    }
    ans.push(tagEnd);
    return ans.join('');
  }
}

type DomType = typeof Dom;
export type { DomType }
