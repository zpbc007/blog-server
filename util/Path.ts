/**
 * 格式化路径
 * @param path 路径
 */
function pathFormat (path: string) {
    if (path.indexOf('/') !== 0) {
        return `/${path}`
    } else {
        return path
    }
}

export {
    pathFormat
}