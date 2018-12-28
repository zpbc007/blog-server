import { Injectable } from '@nestjs/common';
import { UserLoginDto } from './dto/user_login.dto';
import { Repository } from 'typeorm';
import { Users } from './entity/users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { compareSync, hashSync } from 'bcrypt';
import { UserModifyDto } from './dto/user_modify.dto';
import { createServiceResult, ServiceResult } from 'src/common/interface/service_result.interface';
import { UserChangePasswordDto } from './dto/user_changePass.dto';
import { config } from 'server.config';

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
     * 通过id查找用户
     */
    async findOneById(id: number) {
        return await this.usersRepo
            .createQueryBuilder('user')
            .where('user.id = :id', {
                id,
            })
            .getOne();
    }

    /**
     * 查找所有用户
     */
    async findAll() {
        return await this.usersRepo
            .createQueryBuilder()
            .getMany();
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

        const verifi_token = hashSync(config.user.defaultPass, config.bcrypt.saltRounds);

        const result = await this.usersRepo
            .createQueryBuilder()
            .insert()
            .into(Users)
            .values([{
                super: false,
                enable: false,
                ...userModifyDto,
                verifi_token,
            }])
            .execute();

        if (result && result.identifiers.length > 0) {
            return createServiceResult(true, '创建成功', result.identifiers[0].id);
        } else {
            return createServiceResult(false, '创建失败');
        }
    }

    /**
     * 编辑用户
     */
    async editUser({ id, ...updateValue }: UserModifyDto) {
        const user = await this.findOneById(id);

        if (!user) {
            return createServiceResult(false, '没有此用户');
        }

        const result = await this.usersRepo
            .createQueryBuilder()
            .update()
            .set(updateValue)
            .where('id = :id', {
                id,
            })
            .execute();

        if (result && result.generatedMaps.length > 0) {
            return createServiceResult(true, '编辑成功', result.generatedMaps[0]);
        } else {
            return createServiceResult(false, '编辑失败');
        }
    }

    /**
     * 修改密码
     */
    async changePassword({ id, password, confirm_password }: UserChangePasswordDto) {
        const user = await this.findOneById(id);

        if (!user) {
            return createServiceResult(false, '没有此用户');
        }

        if (password !== confirm_password) {
            return createServiceResult(false, '两次密码不一致');
        }

        const verifi_token = hashSync(password, config.bcrypt.saltRounds);

        const result = await this.usersRepo
            .createQueryBuilder()
            .update({
                verifi_token,
            })
            .where('id = :id', {
                id,
            })
            .execute();

        if (result && result.generatedMaps.length > 0) {
            return createServiceResult(true, '密码修改成功', result.generatedMaps[0]);
        } else {
            return createServiceResult(false, '密码修改失败');
        }
    }

    /**
     * 删除用户
     */
    async delUser(id: number) {
        const user = await this.findOneById(id);

        if (!user) {
            return createServiceResult(false, '没有此用户');
        }

        const result = await this.usersRepo
            .createQueryBuilder()
            .delete()
            .where('id = :id', {
                id,
            })
            .execute();

        if (result.affected) {
            return createServiceResult(true, '删除成功');
        } else {
            return createServiceResult(false, '删除失败');
        }
    }
}
