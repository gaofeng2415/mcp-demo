// dom 工厂
class DomFactory {
  static createDom(tagName) {
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

export default DomFactory;

class Dom {
  constructor(tagName, attributes, children, textContent, dataset, parentNode) {
    this.tagName = tagName;
    this.attributes = attributes || {};
    this.children = children || [];
    this.textContent = textContent || '';
    // this.events = {};
    this.dataset = dataset || {};
    this.parentNode = parentNode || null;
    this.node = null; // DOM节点
  }
  // attributes getter setter
  setAttributes(attributes = {}) {
    this.attributes = { ...this.attributes, ...attributes };
    return this;
  }
  setAttribute(name, value) {
    this.attributes[name] = value;
    return this;
  }
  getAttribute(name) {
    return this.attributes[name];
  }
  removeAttribute(name) {
    delete this.attributes[name];
    return this;
  }
  // children getter setter
  appendChild(child) {
    if (Array.isArray(child)) {
      this.children = this.children.concat(child);
    } else {
      this.children.push(child);
    }
    return this;
  }
  removeChild(child) {
    this.children = this.children.filter(c => c !== child);
    return this;
  }
  // textContent getter setter
  setText(text) {
    this.textContent = text;
    return this;
  }
  getText() {
    return this.textContent;
  }
  // dataset getter setter
  setDataset(key, value) {
    this.dataset[key] = value;
    return this;
  }
  getDataset(key) {
    return this.dataset[key];
  }
  removeDataset(key) {
    delete this.dataset[key];
    return this;
  }
  // parentNode getter setter
  setParentNode(node) {
    this.parentNode = node;
    return this;
  }
  getParentNode() {
    return this.parentNode;
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
  toString(indentStart = 0) {
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
