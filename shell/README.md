# Monorepo Shell

#### 集成

```shell
git submodule add ssh://git@10.99.40.100:222/fbi/ued/ued-shell.git shell
```

#### shell.config.ts配置示例

```ts
export const configs: any = {
    // 开发环境
    dev: {
        host: 'ip',
        username: 'root',
        password: '',
        localFile: './dist',
        remoteFile: '/data/test/',
        shell: './install.sh'
    },
    // 测试环境
    test: {
        host: 'ip',
        username: 'root',
        password: '',
        localFile: './dist',
        remoteFile: '/data/test/',
        shell: './install.sh'
    }
}
```