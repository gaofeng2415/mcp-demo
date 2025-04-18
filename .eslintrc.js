module.exports = {
  root: true,
  env: {
    node: true, // Node.js 全局变量（如 `process`）
    browser: true, // 浏览器全局变量（如 `window`）
    es2021: true, // ES6+ 语法支持
  },
  extends: [
    "eslint:recommended", // ESLint 官方推荐规则
    "plugin:prettier/recommended", // 整合 Prettier（避免与 ESLint 冲突）
  ],
  parserOptions: {
    ecmaVersion: "latest", // 使用最新 ECMAScript 标准
    sourceType: "module", // 使用 ES Modules
  },
  rules: {
    // 自定义规则（覆盖 extends 的配置）
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off", // 生产环境禁用 console
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off", // 生产环境禁用 debugger
    "prettier/prettier": "warn", // Prettier 格式化警告
  },
};
