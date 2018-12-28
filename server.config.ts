import { resolve } from 'path';

export const config = {
    port: 3000,
    jwt: { // json web token 相关配置
        secretKey: '_my_private_jwt_key',
        expiresIn: 3600,
    },
    bcrypt: { // 密码加密相关配置
        saltRounds: 10,
    },
    user: { // 用户相关配置
        defaultPass: '123456',
    },
    file: { // 文件存储相关配置
        baseDir: resolve(__dirname, '../blog/doc'),
    },
};
