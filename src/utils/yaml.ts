import * as fs from 'node:fs/promises';
import { fileURLToPath } from 'url';
import path from 'path';
import { parse } from 'yaml';

/**
 * @description 解析yaml
 * @param {string} yamlString 未解析的yaml字符串文本
 * @returns {object} 解析后的对象
 */
export const parseYaml = (yamlString: string): Record<string, any> => parse(yamlString);

/**
 * @description 从文件中读取yaml并解析
 * @param {string} filePath 文件路径,仅支持项目绝对路径，.e.g ./src/utils/parse-yaml.js
 * @returns {object} 解析后的对象
 */
export async function readFileToYaml(filePath = './local.yaml') {
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  filePath = path.join(__dirname, '../..', filePath)
  const fileContent = await fs.readFile(filePath, 'utf-8');
  return parseYaml(fileContent)
}

/**
 * @description 同步指定yaml配置到本地yaml
 */
export async function syncYamlToLocal() {
  // 获取命令行入参 model=qwen2.5-72b-instruct ui=figma => [
  //   { configType: 'model', path: 'qwen2.5-72b-instruct' },
  //   { configType: 'ui', path: 'figma' },
  // ]
  const args = [...process.argv].slice(2)
  if (args.length === 0) return
  const fileNameList = args.map((arg) => {
    const [configType, fileName] = arg.split('=')
    return { configType, path: fileName }
  }).filter((v) => Boolean(v.configType) && Boolean(v.path))
  if (fileNameList.length === 0) return
  // 读取yaml文件并解析
  const contentList = await Promise.all(fileNameList.map(file => fs.readFile(path.resolve(`./envs/${file.path}.yaml`))))
  const content = fileNameList.map((file, index) => {
    const fileContent = contentList[index]
    return `# ${file.configType}\n${fileContent}`
  }).join('\n\n')
  return fs.writeFile(path.resolve('./local.yaml'), content)
}

/**
 * @description 读取yaml文件并解析为对象，存储到全局变量config中
 */
export async function loadYamlToGlobal() {
  const yaml = await readFileToYaml()
  global.config = yaml
}


/**
 * @description 读取全局配置，并获取指定yaml类型的配置
 * @param {string} yamlType yaml 类型 （agent、ui）
 * @returns {object} yaml配置对象
 */
export async function getConfig(yamlType: string): Promise<Record<string, any> | null> {
  // 加载配置文件到全局变量
  if (!global.config) { // 避免多次加载yaml
    await loadYamlToGlobal();
  }
  const globalConfig = global.config || {}
  let config = null
  Object.keys(globalConfig).forEach((key) => {
    if (globalConfig[key].yamlType === yamlType) {
      config = globalConfig[key]
    }
  })
  return config
}
