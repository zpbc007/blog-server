import { copyDir, clearDir } from '../util/file'
import { resolve } from 'path'

// compile server code
async function build () {
    console.log('清空目录...')
    // 清空目录
    await clearDir(resolve(__dirname, '../dist'))
    console.log('目录清空完成')

    console.log('复制server静态文件...')
    // 复制静态文件
    await copyDir(resolve(__dirname, '../assets'), resolve(__dirname, '../dist'))
    console.log('复制server静态文件完成')

    console.log('复制markdown')
    // 复制markdown
    await copyDir(resolve(__dirname, '../docs'), resolve(__dirname, '../dist'))
    console.log('复制markdown完成')
}

console.group('开始编译server')
build()
console.log('server编译完成')
console.groupEnd()