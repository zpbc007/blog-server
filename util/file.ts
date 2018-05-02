import { readFile, stat, readdir, Stats } from 'fs'
// 文件相关操作

// 读取文件
function _readFile (path) {
    return new Promise((resolve, reject) => {
        console.group('--->')
        console.log(`开始读取文件: ${path}`)
        readFile(path, 'utf8', (err, data) => {
            if (err) {
                reject()
                throw new Error(`读取文件: ${path} 出错`)
            } else {    
                console.log(`文件读取结束: ${path}`)
                console.groupEnd()
                resolve(data)
            }
        })
    })
}

// 遍历取得路径下的所有文件名
async function _getFileNames (path, result) {
    const files = await _readdir(path)
    for (let file of files) {
        const filePath = `${path}/${file}`
        const status = await _stat(filePath)
        if (status.isDirectory()) {
            let temp = []
            await _getFileNames(filePath, temp)
            result.push(temp)
        } else {
            result.push(file)
        }
    }
}

// 返回promise的readdir
function _readdir (path): Promise<string[]> {
    return new Promise((resolve, reject) => {
        readdir(path, (err, files) => {
            if (err) {
                reject()
                throw new Error(`读取文件夹: ${path} 出错`)
            } else {
                resolve(files)
            }
        })
    })
}

// 返回promise的stat
function _stat (path): Promise<Stats> {
    return new Promise ((resolve, reject) => {
        stat(path, (err, status) => {
            if (err) {
                reject()
                throw new Error(`读取文件夹: ${path} 出错`)
            } else {
                resolve(status)
            }
        })
    })
}

// 递归遍历文件夹下所有的文件
async function getFileNames (path) {
    let result = []
    await _getFileNames(path, result)
    return result
}

// 拷贝目录下的所有文件到目标文件夹
async function copyDir (sourceDir, targetDir) {
    
}

export {
    _readFile as readFile,
    getFileNames
}