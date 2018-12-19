import { IsString, Length } from 'class-validator';

export class UserLoginDto {
    // 密码
    @IsString()
    @Length(6, 30)
    password: string;

    // 账户
    @IsString()
    @Length(6, 30)
    account: string;
}
