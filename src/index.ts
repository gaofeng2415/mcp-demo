import { syncYamlToLocal } from './utils/yaml.ts'
import { exec } from 'child_process'

// 加载配置
await syncYamlToLocal();

const child = exec('ts-node src/utils/fetch-test.ts')

child?.stdout?.on('data', (data) => {
  console.log(data);
})
