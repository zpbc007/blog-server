import { IsString, Length } from 'class-validator';

export class UserLoginDto {
    // 密码
    @IsString({
        message: '密码应该为字符串',
    })
    @Length(6, 30, {
        message: '密码长度应该在6-30位之间',
    })
    password: string;

    // 账户
    @IsString({
        message: '账号应该为字符串',
    })
    @Length(6, 30, {
        message: '账号长度应该在6-30位之间',
    })
    account: string;
}
