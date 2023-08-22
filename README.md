# admin system forend

系统中已完成基础功能：用户、角色、菜单、操作日志、权限过滤

## 克隆

```bash
$ git clone git@github.com:yoloz/admin-system-fore-end.git
# 连接公司的vpn拉取module模块(使用到的功能忽略不计,可以移除)
$ git submodule init
$ git submodule update
```

## 结构

在项目的第一级目录的内容以脚手架为主，目录 packages/、目录 shell/一般无需改动，由单独项目维护，目录 src/web 是实际开发目录：

```log
├── commitlint.config.js
├── commitlint.config.ts
├── package.json
├── packages
├── pnpm-lock.yaml
├── pnpm-workspace.yaml
├── README.en.md
├── README.md
├── shell
├── shell.config.ts
├── src
├── tsconfig.base.json
├── tsconfig.json
└── tsconfig.package.json
```

## 运行

```bash
#nodejs安装
$ npm install -g pnpm
$ pnpm i
#具体查看package.json中的定义
$ pnpm run web:start
# build: [vite:terser] terser not found. Since Vite v3, terser has become an optional dependency. You need to install it.
$ pnpm install terser -D -w
$ pnpm run web:build
```

## 技术栈

1. Vue3 新版本
2. Vue-router@4 路由
3. Element-plus UI 库
4. Pinia 状态库，替换原有 vuex
5. Typescript 集成，100%使用 ts 编写
6. Vite 构建工具，替换 webpack
7. Eslint 代码检查工具，支持一键修复，自定义校验规则
8. Sass 100%使用 sass 编写样式
9. Husky+lint-staged git hook 代码提交规范约束检查
10. Monorepo + pnpm 单仓库多项目的方式，项目更加灵活，尤其管理同一产品多项目，用起来很爽
11. Git submodule 子模块方式，维护公用仓库（通用 Axios、通用组件、utils 等）
12. Axios 请求器，基于 TS 封装，支持多个实例化，全局拦截，全局相应等
13. Node-shell 集成，编写自定义命令，轻量级一键打包&部署
14. Vite build 打包优化处理，样式分离、gzip 压缩等
15. .env 环境分离，不同环境指定不同配置
16. Proxy 开发环境反向代理配置
17. @vueuse/core，useDark/useToggle 浅色深色主题切换（dark 样式编写）
18. Element 样式变量 variables 和样式覆盖 override
19. Husky+cz-git 代码 commit 是规范约束校验
