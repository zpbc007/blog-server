import { IsString, Length, IsUrl, IsBoolean } from 'class-validator';

// 用户编辑
export class UserModifyDto {
    id: number;

    // 头像
    @IsString()
    avatar?: string;

    // 昵称
    @IsString({
        message: '昵称应该为字符串',
    })
    @Length(1, 30, {
        message: '昵称应该在1-30位之间',
    })
    nickname: string;

    // 启用
    @IsBoolean({
        message: '启用应该为布尔值',
    })
    enable: boolean;

    // 账户
    @IsString({
        message: '账号应该为字符串',
    })
    @Length(6, 30, {
        message: '账号长度应该在6-30位之间',
    })
    account: string;
}
