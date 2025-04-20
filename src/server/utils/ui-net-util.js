import uiHttp from '../../utils/ui-fetch.js';

/**
 * @description 通过Figma API获取文件数据， 入参为文件ID
 * @param {string} fileId 文件id
 * @param {string} nodeIds 节点ids
 * @returns
 */
export function getFigmaFileData(fileId, nodeIds) {
  const uri = nodeIds ? `/v1/files/${fileId}/nodes?ids=${nodeIds}` : `/v1/files/${fileId}`
  return uiHttp.get(uri)
}
