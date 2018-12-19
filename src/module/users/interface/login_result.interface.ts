import { Users } from '../entity/users.entity';

export interface LoginResult {
    // 返回的信息
    msg: string;
    // 登录结果
    result: boolean;
    // 登录成功对应的user
    user: Users;
}
