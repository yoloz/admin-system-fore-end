module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true,
        'vue/setup-compiler-macros': true
    },
    extends: ['plugin:vue/essential', 'standard'],
    parserOptions: {
        ecmaVersion: 'latest',
        parser: '@typescript-eslint/parser',
        sourceType: 'module'
    },
    plugins: ['vue', '@typescript-eslint'],
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 0 : 1,
        'no-debugger': process.env.NODE_ENV === 'production' ? 0 : 1,
        // 禁止尾部使用分号“ ; ”
        semi: [2, 'never'],
        'no-undef': 'off',
        // 禁止使用 var
        'no-var': 'error',
        'eol-last': 0,
        'space-before-function-paren': 0,
        // 缩进2格
        indent: ['error', 4, { SwitchCase: 1 }],
        'vue/no-unused-vars': 0,
        'vue/require-explicit-emits': 0,
        'vue/no-multiple-template-root': 0,
        // 不能空格与tab混用
        'no-mixed-spaces-and-tabs': 'error',
        // 使用单引号
        quotes: [2, 'single'],
        'vue/compiler-sfc': 'off',
        'vue/no-v-model-argument': 'off',
        // 不强制换行
        'vue/html-closing-bracket-newline': 'off',
        // 不强制换行
        'vue/singleline-html-element-content-newline': 'off',
        'vue/multi-word-component-names': 'off',

        // close js rules
        'no-shadow': 'off',
        // ts
        '@typescript-eslint/no-var-requires': 'warn',
        '@typescript-eslint/ban-ts-comment': 'off',
        '@typescript-eslint/no-misused-promises': 'off',
        '@typescript-eslint/no-floating-promises': 'off',
        '@typescript-eslint/ban-types': 'off',
        '@typescript-eslint/no-shadow': 'error',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-unsafe-member-access': 'off',
        '@typescript-eslint/no-loss-of-precision': 'off',
        '@typescript-eslint/no-unsafe-argument': 'off',
        // no any
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-unsafe-assignment': 'off',
        '@typescript-eslint/no-unsafe-return': 'off',
        '@typescript-eslint/no-unsafe-call': 'off',
        // ! operator
        '@typescript-eslint/no-non-null-assertion': 'off',
        // import排序规则
        'import/order': [
            'error',
            {
                /**
                 * 内置分组顺序
                 * 内置模块、外部模块、内部引用、兄弟以来、父节点依赖、index文件依赖、未知
                 */
                groups: [
                    'builtin',
                    'external',
                    'internal',
                    'sibling',
                    'parent',
                    'index',
                    'unknown'
                ],
                /**
                 * 自定义分组顺序
                 * vue -> 内置模块之后
                 * element-plus -> 内置模块之后
                 * @/** -> 外部模块之后
                 */
                pathGroups: [
                    {
                        pattern: 'vue',
                        group: 'builtin',
                        position: 'after'
                    },
                    {
                        pattern: 'element-plus',
                        group: 'builtin',
                        position: 'after'
                    },
                    {
                        pattern: '@/**',
                        group: 'external',
                        position: 'after'
                    }
                ],
                'newlines-between': 'always'
            }
        ]
    }
}
