import DomFactory from './html/core.js'
import CssFactory from './css/core.js'

// padding 键名
const paddingDirectList = ['paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft']

// margin 键名
const marginDirectList = ['marginTop', 'marginRight', 'marginBottom', 'marginLeft']

const widthKey = 'width'
const heightKey = 'height'
const backgroundColorKey = 'backgroundColor'
/**
 * @description 解析节点数据
 * @param {object} nodeJson 节点描述的json
 */
function parseDom(nodeJson) {
  const dom = DomFactory.createDom('div');
  const css = CssFactory.createCss(dom);
   // 设置文本
  if (nodeJson.characters) {
    dom.setText(nodeJson.characters);
  }
  // 设置背景颜色
  if (nodeJson?.[backgroundColorKey]) {
    css.setStyle('background-color', CssFactory.rgbaToHex(nodeJson[backgroundColorKey]));
  }
  // 设置宽高
  if (nodeJson.absoluteBoundingBox) {
    css.setStyle('width', `${nodeJson.absoluteBoundingBox?.[widthKey]}px`);
    css.setStyle('height', `${nodeJson.absoluteBoundingBox?.[heightKey]}px`);
  }
  // 设置内边距
  paddingDirectList.forEach((paddingKey) => {
    if (nodeJson?.[paddingKey]) {
      css.setStyle(paddingKey, `${nodeJson?.[paddingKey]}px`);
    }
  })
  // 设置外边距
  marginDirectList.forEach((marginKey) => {
    if (nodeJson?.[marginKey]) {
      css.setStyle(marginKey, `${nodeJson?.[marginKey]}px`);
    }
  })
  // 渲染并链接子节点
  if (nodeJson.children) {
    const domChildren = nodeJson.children?.map((child) => {
      const domChild = parseDom(child)
      domChild.setParentNode(dom);
      return domChild;
    })
    dom.appendChild(domChildren);
  }
  return dom;
}

/**
 * @description: 解析UI数据
 * @param {object} json 节点描述的json
 * @return {HTMLElement.Node || null} 节点数据
 */
function parse(json) {
  let nodeJsonList = null
  if (!json.nodes) {
    nodeJsonList = [json]
  } else {
    // 解析节点数据
    nodeJsonList = Object.values(json.nodes || {}).map(_ => _.document).filter(Boolean)
  }
  return nodeJsonList.map((nodeJson) => parseDom(nodeJson).toString())
}

export default { parse }
