import ora from 'ora'
import chalk from 'chalk'
import NodeSSH from 'node-ssh'

import { configs } from '../shell.config'

const args: string = process.argv.slice(2)[0] + ''
const config = configs[args]

const spinner = ora()
const ssh = new NodeSSH()
const readline = require('readline')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

console.log(chalk.white('\n' + chalk.magenta('SSH 轻量级快速部署（命令行）') + '\n'))
console.log(chalk.gray('Please enter the ssh connection password first...'))

rl.question('password:', (answer = '') => {
    config.password = answer
    linkServer().then(() => { })
    rl.close()
})

const linkServer = async () => {
    console.log(chalk.gray('\nrun go\n'))
    spinner.warn(chalk.grey('------------------------------------------------------'))
    spinner.warn(chalk.yellow(' 服务器地址：') + chalk.blue(config.host))
    spinner.warn(chalk.yellow(' 连接名：') + chalk.blue(config.username))
    spinner.warn(chalk.yellow(' 连接密码：') + chalk.blue('******'))
    spinner.warn(chalk.yellow(' 本地上传文件地址：') + chalk.blue(config.localFile))
    spinner.warn(chalk.yellow(' 远程替换文件地址：') + chalk.blue(config.remoteFile))
    spinner.warn(chalk.yellow(' 远程安装脚本：') + chalk.blue(config.shell))
    spinner.warn(chalk.grey('------------------------------------------------------\n'))
    spinner.start(chalk.blue('SSH 正在连接服务器'))
    ssh.connect(config).then(async (nodeSSH) => {
        spinner.succeed(chalk.green('SSH 服务器连接成功.'))
        spinner.start(chalk.blue('开始上传文件'))
        const put = await nodeSSH.putDirectory(config.localFile, config.remoteFile)
        if (put) {
            spinner.succeed(chalk.green('SSH 文件替换成功.\n'))
            spinner.info('SSH ' + chalk.magenta(config.localFile + chalk.grey(' ==> ') + config.remoteFile))
            console.log(chalk.cyan('\nWeitu shell v1.0.0 ') + chalk.green('script running result:'))
            console.log('\n> ssh connection: ' + chalk.cyan('\tssh://' + config.host + ':22'))
            console.log('> web network: ' + chalk.cyan('\t\thttp://' + config.host + ':80' + '\n'))
        } else {
            spinner.fail(chalk.red('SSH 文件上传失败.') + '\n')
        }
        nodeSSH.connection?.destroy()
    }).catch((err) => {
        spinner.fail(chalk.red('SSH 服务器连接失败'))
        spinner.fail(chalk.bgRed(err) + '\n')
    }).finally(() => {
        spinner.clear()
    })
}
