
import vue from '@vitejs/plugin-vue'
import { PluginOption, defineConfig, loadEnv } from 'vite'
import eslintPlugin from 'vite-plugin-eslint'
import viteCompression from 'vite-plugin-compression'
import { viteMockServe } from 'vite-plugin-mock'

import packageFile from './package.json'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { resolve } = require('path')

const config = loadEnv('development', './')
// eslint-disable-next-line no-console
console.log('|----------------------------------------')
// eslint-disable-next-line no-console
console.log('| 产品名称 ==>', packageFile.description)
// eslint-disable-next-line no-console
console.log('| 产品代号 ==>', config.VITE_BASE_URL)
// eslint-disable-next-line no-console
console.log('| 代理地址 ==>', config.VITE_HTTP_SERVER_URL)
// eslint-disable-next-line no-console
console.log('| 运行环境 ==>', process.env.VITE_USER_NODE_ENV)
// eslint-disable-next-line no-console
console.log('|----------------------------------------')

const enableMock: boolean = (config.VITE_USE_MOCK as unknown as boolean) || false

// https://vitejs.dev/config/
export default ({ mode }: any) => defineConfig({
    server: {
        port: 8089,
        open: false,
        proxy: {
            '/dev': {
                target: loadEnv(mode, process.cwd()).VITE_HTTP_SERVER_URL,
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/dev/, '')
            },
            '/ws': {
                target: 'ws://localhost:8080',
                ws: true
            }
        }
    },
    resolve: { alias: { '@': resolve(__dirname, './src') } },
    css: {
        preprocessorOptions: { scss: { additionalData: '@import "@/styles/variables.scss";' } }
    },
    plugins: [
        vue() as PluginOption,
        eslintPlugin({
            include: [
                'src/**/*.js',
                'src/**/*.ts',
                'src/**/*.vue',
                'src/*.js',
                'src/*.ts',
                'src/*.vue'
            ]
        }) as PluginOption,
        viteCompression({
            threshold: 10240 // 对超过10k的数据压缩
        }),
        // 具体配置可见：https://github.com/vbenjs/vite-plugin-mock
        viteMockServe({
            mockPath: './src/mock/api',
            enable: enableMock,
            watchFiles: false
        })
    ],
    // 打包配置
    build: {
        minify: 'terser',
        // 设置最终构建的浏览器兼容目标。默认值是一个 Vite 特有的值——'modules'，这是指 支持原生 ES 模块的浏览器。
        // target: 'es2015',
        // 指定生成静态资源的存放路径（相对于 build.outDir）。
        // outDir: 'dist',
        // 指定生成静态资源的存放路径（相对于 build.outDir）。
        // assetsDir: 'assets',
        /**
         * 构建后是否生成 source map 文件。如果为 true，
         * 将会创建一个独立的 source map 文件。如果为 'inline'，
         * source map 将作为一个 data URI 附加在输出文件中。'hidden' 的工作原理与 'true' 相似
         * ，只是 bundle 文件中相应的注释将不被保留。
         */
        // sourcemap: false,
        terserOptions: {
            /**
             * command 用来判断环境
             */
            compress: {
                drop_console: true,
                drop_debugger: true
            }
        }
    }
})

// https://www.tslang.cn/docs/handbook/compiler-options.html