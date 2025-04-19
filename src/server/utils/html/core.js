// dom 工厂
class DomFactory {
  createDom(tagName) {
    const dom = new Dom(tagName);
    return dom;
  }
  createFragment() {
    return document.createDocumentFragment();
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
    this.children.push(child);
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
}
