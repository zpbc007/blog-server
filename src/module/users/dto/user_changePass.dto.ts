import { IsString, Length } from 'class-validator';

// 用户修改密码
export class UserChangePasswordDto {
    // 用户id
    id: number;

    // 密码
    @IsString({
        message: '密码应该为字符串',
    })
    @Length(6, 30, {
        message: '密码长度应该在6-30位之间',
    })
    password: string;

    // 确认密码
    @IsString({
        message: '账号应该为字符串',
    })
    @Length(6, 30, {
        message: '账号长度应该在6-30位之间',
    })
    confirm_password: string;
}
