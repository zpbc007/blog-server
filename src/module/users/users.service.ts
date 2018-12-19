import { Injectable } from '@nestjs/common';
import { UserLoginDto } from './dto/users.dto';
import { Repository } from 'typeorm';
import { Users } from './entity/users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { compareSync } from 'bcrypt';
import { LoginResult } from './interface/login_result.interface';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(Users)
        private readonly usersRepo: Repository<Users>,
    ) {}
    /**
     * 校验登录
     */
    async loginValidate({ account, password }: UserLoginDto): Promise<LoginResult> {
        const user = await this.usersRepo
            .createQueryBuilder('user')
            .where('user.account = :account', {
                account,
            })
            .getOne();

        if (!user) {
            return this.createResult('账户或密码不存在', null, false);
        }

        if (!user.enable) {
            return this.createResult('账号未启用', null, false);
        }

        const passResult = compareSync(password, user.verifi_token);

        if (!passResult) {
            return this.createResult('账户或密码不存在', null, false);
        } else {
            return this.createResult('登录成功', user, true);
        }
    }

    async findOneByAccount(account: string) {
        return {};
    }

    private createResult(msg, user: Users = null, result = false): LoginResult {
        return {
            msg,
            result,
            user,
        };
    }
}
