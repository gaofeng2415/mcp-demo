import { syncYamlToLocal } from './utils/yaml.js'
import { exec } from 'child_process'

// 加载配置
await syncYamlToLocal();

const child = exec('node src/utils/fetch-test.js')

child.stdout.on('data', (data) => {
  console.log(data);
})
