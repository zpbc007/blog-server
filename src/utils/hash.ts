import { createHash } from 'crypto';

const md5 = createHash('md5');

/**
 * 计算内容md5
 */
export function getMd5(content: string | Buffer | NodeJS.TypedArray | DataView) {
    return md5.update(content).digest('hex');
}
