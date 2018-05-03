import { copyDir, clearDir } from '../util/file'
import { resolve } from 'path'
import { copyFile, rmdir } from 'fs'

async function build () {
    // 清空目录
    await clearDir(resolve(__dirname, '../dist'))
    // 复制静态文件
    await copyDir(resolve(__dirname, '../assets'), resolve(__dirname, '../dist'))
    // 复制markdown
    await copyDir(resolve(__dirname, '../docs'), resolve(__dirname, '../dist'))
}

build()