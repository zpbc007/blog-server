import { Injectable } from '@nestjs/common';
import { UserLoginDto } from './dto/user_login.dto';
import { Repository } from 'typeorm';
import { Users } from './entity/users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { compareSync } from 'bcrypt';
import { LoginResult } from './interface/login_result.interface';
import { UserModifyDto, UserModifyDtoToUserEntity } from './dto/user_modify.dto';
import { createServiceResult, ServiceResult } from './interface/service_result.interface';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(Users)
        private readonly usersRepo: Repository<Users>,
    ) {}

    /**
     * 通过账号查找用户
     */
    async findOneByAccount(account: string) {
        return await this.usersRepo
            .createQueryBuilder('user')
            .where('user.account = :account', {
                account,
            })
            .getOne();
    }

    /**
     * 校验登录
     */
    async loginValidate({ account, password }: UserLoginDto): Promise<ServiceResult<Users>> {
        const user = await this.findOneByAccount(account);

        if (!user) {
            return createServiceResult(false, '账户或密码不存在', null);
        }

        if (!user.enable) {
            return createServiceResult(false, '账号未启用', null);
        }

        const passResult = compareSync(password, user.verifi_token);

        if (!passResult) {
            return createServiceResult(false, '账户或密码错误', null);
        } else {
            return createServiceResult(true, '登录成功', user);
        }
    }

    /**
     * 添加用户
     */
    async addUser(userModifyDto: UserModifyDto) {
        const { account } = userModifyDto;
        const user = await this.findOneByAccount(account);

        if (user) {
            return createServiceResult(false, '该账号已经存在');
        }

        const userEntity = await UserModifyDtoToUserEntity(userModifyDto);

        const result = await this.usersRepo
            .createQueryBuilder()
            .insert()
            .into(Users)
            .values([userEntity])
            .execute();

        if (result && result.identifiers.length > 0) {
            return createServiceResult(true, '创建成功', result.identifiers[0]);
        } else {
            return createServiceResult(false, '创建失败');
        }
    }
}
