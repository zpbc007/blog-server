import { UserLoginDto } from './user_login.dto';
import { IsString, Length, IsUrl, IsBoolean } from 'class-validator';
import { Users } from '../entity/users.entity';
import { hash } from 'bcrypt';
import { config } from 'server.config';

// 用户编辑
export class UserModifyDto extends UserLoginDto {
    // 确认密码
    @IsString({
        message: '账号应该为字符串',
    })
    @Length(6, 30, {
        message: '账号长度应该在6-30位之间',
    })
    confirm_password: string;

    // 头像
    @IsUrl({
        require_protocol: false,
    })
    avatar: string;

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
}

// dto转为entity
export async function UserModifyDtoToUserEntity({ account, avatar, nickname, enable, password }: UserModifyDto): Promise<Users> {
    const user =  new Users();

    user.account = account;
    user.verifi_token = await hash(password, config.bcrypt.saltRounds);
    user.avatar = avatar;
    user.nickname = nickname;
    user.enable = enable;

    return user;
}
