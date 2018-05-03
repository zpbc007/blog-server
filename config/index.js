const { promisify } = require('util')
const { resolve } = require('path')
const exec = promisify(require('child_process').exec)

// pm2使用

// 项目根目录
const ServerDir = resolve(__dirname, '../'),
    FrontDir = resolve(ServerDir, '../blog-client')


// 编译
async function buildServer () {
    await exec('ts-node ./config/build.ts & tsc', {
        cwd: ServerDir
    })
}

// 生成前台静态文件
async function buildFront () {
    await exec('npm run build', {
        cwd: FrontDir
    })
}

// 移动前台静态文件
async function moveFront () {
    const {stdout, stderr} = await exec('npm run move', {
        cwd: ServerDir
    })
}

function start () {
    require('../dist/app/app.js')
}

async function init () {
    console.group('开始编译')
    await buildFront()
    await buildServer()
    await moveFront()
    console.log('编译全部完成')
    console.groupEnd()
    start()
}

init()