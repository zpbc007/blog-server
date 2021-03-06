import { copyDir, clearDir } from '../util/file'
import { resolve } from 'path'
import { promisify } from 'util'
import { exec } from 'child_process'

const _exec = promisify(exec),
    frontDir = resolve(__dirname, '../../blog-client')

// move client code to dist
async function move () {
    await copyDir(resolve(frontDir, './dist'), resolve(__dirname, '../dist/pages'), false)
}

console.log('开始移动client文件...')
move ()
console.log('client文件移动完成')