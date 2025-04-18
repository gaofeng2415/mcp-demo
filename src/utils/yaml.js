import * as fs from 'node:fs/promises';
import path from 'path';
import { parse } from 'yaml';

/**
 * @description 解析yaml
 * @param {string} yamlString 未解析的yaml字符串文本
 * @returns {object} 解析后的对象
 */
export const parseYaml = (yamlString) => parse(yamlString);

/**
 * @description 从文件中读取yaml并解析
 * @param {string} filePath 文件路径,仅支持项目绝对路径，.e.g ./src/utils/parse-yaml.js
 * @returns {object} 解析后的对象
 */
export async function readFileToYaml(filePath) {
  filePath = path.resolve(filePath)
  const fileContent = await fs.readFile(filePath, 'utf-8');
  return parseYaml(fileContent)
}

/**
 * @description 同步指定yaml配置到本地yaml
 */
export async function syncYamlToLocal() {
  // 获取命令行入参
  const args = [...process.argv].find((v) => v.startsWith('yaml=')) ?? ''
  if (!args || !args.split('=')[1]) return
  const fileName = args.split('=')[1]
  if (!fileName) return
  const content = await fs.readFile(path.resolve(`./envs/${fileName}.yaml`))
  return fs.writeFile(path.resolve('./local.yaml'), content)
}
