import { 
    readFile, 
    stat, 
    readdir, 
    Stats,
    copyFile,
    mkdir, 
    unlink,
    rmdir,
    access
} from 'fs'
import { relative, resolve, parse, dirname} from 'path'
import { promisify } from 'util'

enum FileType {
    Dir,
    File
}

interface PathName {
    absDir: string
    name: string,
    type: FileType
}

// ==============api的Promise封装==============

// 读取文件夹
function _readdir (path): Promise<string[]> {
    return new Promise((resolve, reject) => {
        readdir(path, (err, files) => {
            if (err) {
                reject()
                throw new Error(`读取文件夹: ${path} 出错, ${err}`)
            } else {
                resolve(files)
            }
        })
    })
}

// 读取文件
function _readFile (path) {
    return new Promise((resolve, reject) => {
        console.log(`开始读取文件: ${path}`)
        readFile(path, 'utf8', (err, data) => {
            if (err) {
                reject()
                throw new Error(`读取文件: ${path} 出错, ${err}`)
            } else {    
                console.log(`文件读取结束: ${path}`)
                resolve(data)
            }
        })
    })
}

// 文件夹状态
function _stat (path): Promise<Stats> {
    return new Promise ((resolve, reject) => {
        stat(path, (err, status) => {
            if (err) {
                reject(err)
            } else {
                resolve(status)
            }
        })
    })
}

// 复制文件
function _copyFile (source, target) {
    return new Promise((resolve, reject) => {
        copyFile(source, target, (err) => {
            if (err) {
                reject()
                throw new Error(`复制文件出错, ${err}`)
            } else {
                resolve()
            }
        })
    })
}

// 建立文件夹
function _mkdir (path: string) {
    return new Promise((resolve, reject) => {
        mkdir(path, (err) => {
            // 文件夹建立成功或已经存在
            if (!err || err.code === 'EEXIST') {
                resolve()
            } else {
                reject()
                throw new Error(`文件夹建立失败， ${err}`)
            }
        }) 
    })
}

// 删除文件
function _unlink (path: string) {
    return new Promise((resolve, reject) => {
        unlink(path, (err) => {
            if (err) {
                reject()
                throw new Error(`删除文件: ${path}失败, ${err}`)
            } else {
                resolve()
            }
        })
    })
}

// 删除路径
function _rmdir(path: string) {
    return new Promise((resolve, reject) => {
        rmdir(path, (err) => {
            if (err) {
                reject()
                throw new Error(`删除目录: ${path}失败, ${err}`)
            } else {
                resolve()
            }
        })
    })
}


// ==============逻辑==============

// 遍历路径 获取路径下的所有文件夹与文件 深度优先
async function traverseDir (path: string, result: PathName[]) {
    const files = await _readdir(path)
    for (let file of files) {
        const filePath = `${path}/${file}`
        const status = await _stat(filePath)
        if (status.isDirectory()) {
            result.push({
                type: FileType.Dir,
                absDir: filePath,
                name: file
            })
            await traverseDir(filePath, result)
        } else {
            result.push({
                type: FileType.File,
                absDir: filePath,
                name: file
            })
        }
    }
}

// 递归遍历文件夹下所有的文件
async function getFileNames (path) {
    let result = []
    await traverseDir(path, result)
    return result
}

/**
 * @description 拷贝目录下的所有文件到目标文件夹
 * @param sourceDir 源文件夹
 * @param targetDir 目标文件夹
 * @param innerFlag 是否在目标文件夹中建立源文件夹
 */
async function copyDir (sourceDir: string, targetDir: string, innerFlag: boolean = true) {
    
    let result: Array<PathName> = []
    const sourceObj = parse(sourceDir)
    
    // targetDir不存在 建立文件夹
    try {
        await _stat(targetDir)
    } catch (err) {
        if (err.code === 'ENOENT') {
            await _mkdirP(targetDir)
        } else {
            throw new Error(`targetDir: ${targetDir} 不正确`)
        }
    }
    
    if (innerFlag) {
        // 建立目标文件夹
        targetDir = resolve(targetDir, sourceObj.name)
        await _mkdir(targetDir)
    }

    // 遍历目录下所有文件
    await traverseDir(sourceDir, result)

    for (let obj of result) {
        const relPath = relative(sourceDir, obj.absDir)
        if (obj.type === FileType.File) {
            await _copyFile(obj.absDir, resolve(targetDir, relPath))
        } else if (obj.type === FileType.Dir) {
            await _mkdir(resolve(targetDir, relPath))
        }
    }
}

// 删除目录下所有文件
async function clearDir (path: string) {
    let fileAndDir: PathName[] = []
    await traverseDir(path, fileAndDir)
    // 反向遍历 从底层文件开始删除
    for (let i = fileAndDir.length - 1; i >= 0; i--) {
        let current = fileAndDir[i]
        if (current.type === FileType.File) {
            await _unlink(current.absDir)
        } else if (current.type === FileType.Dir) {
            await _rmdir(current.absDir)
        }
    }
}

// mkdir-p
function _mkdirP (path: string) {
    const pathDir = dirname(path)
    return new Promise((resolve, reject) => {
        mkdir(path, async (err) => {
            // 创建成功
            if (!err) {
                resolve() 
            } else if (err && err.code === 'ENOENT') { // 目录不存在向上创建
                // 向上建立父目录
                await _mkdirP(pathDir)
                // 建立子目录
                await _mkdirP(path)
                resolve()
            } else {// 出错了
                reject()
                throw new Error(`创建文件出错, ${err}`)
            }
        })
    })
}

export {
    _readFile as readFile,
    getFileNames,
    copyDir,
    clearDir,
    _mkdirP as mkdirP
}