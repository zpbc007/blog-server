import {
    Controller,
    Get,
    UseGuards,
    Post,
    Inject,
    forwardRef,
    Body,
    UsePipes,
    ValidationPipe,
    BadRequestException,
    Delete,
    Param,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserLoginDto } from './dto/user_login.dto';
import { AuthService } from '../auth/auth.service';
import { UsersService } from './users.service';
import { Result } from 'src/common/dto/result.dto';
import { UserModifyDto } from './dto/user_modify.dto';
import { ServiceResult } from './interface/service_result.interface';
import { UserChangePasswordDto } from './dto/user_changePass.dto';

@Controller('users')
export class UsersController {
    constructor(
        @Inject(forwardRef(() => AuthService))
        private readonly authService: AuthService,
        private readonly usersService: UsersService,
    ) {}

    @Post('/login')
    @UsePipes(ValidationPipe)
    async login(@Body() userLoginDto: UserLoginDto) {
        const { msg, result, data: user } = await this.usersService.loginValidate(userLoginDto);

        if (!result) { // 登录失败
            return new Result(msg, null, 'error');
        }

        const token = await this.authService.signIn({...user});

        return new Result<string>(msg, token);
    }

    /**
     * 判断是否登录
     */
    @Get('/isLogin')
    @UseGuards(AuthGuard())
    async isLogin() {
        return true;
    }

    /**
     * 获取用户列表
     */
    @Get('')
    @UseGuards(AuthGuard())
    async userList() {
        return await this.usersService.findAll();
    }

    /**
     * 新建 保存 用户
     */
    @UseGuards(AuthGuard())
    @UsePipes(ValidationPipe)
    @Post('/')
    async saveUser(@Body() userModifyDto: UserModifyDto) {
        let serviceResult: ServiceResult<any>;
        if (userModifyDto.id) {
            serviceResult = await this.usersService.editUser(userModifyDto);

        } else {
            serviceResult = await this.usersService.addUser(userModifyDto);
        }

        const { result, msg, data } = serviceResult;

        if (result) {
            return new Result(msg, data);
        } else {
            return new Result(msg, data, 'error');
        }
    }

    /**
     * 修改密码
     */
    @UseGuards(AuthGuard())
    @UsePipes(ValidationPipe)
    @Post('/changePass')
    async changePassword(@Body() userChangePasswordDto: UserChangePasswordDto) {
        if (!userChangePasswordDto.id) {
            throw new BadRequestException('用户不存在');
        }

        if (userChangePasswordDto.password !== userChangePasswordDto.confirm_password) {
            throw new BadRequestException('两次密码不一致');
        }

        const { result, msg, data } = await this.usersService.changePassword(userChangePasswordDto);

        if (result) {
            return new Result(msg, data);
        } else {
            return new Result(msg, data, 'error');
        }
    }

    /**
     * 删除用户
     */
    @UseGuards(AuthGuard())
    @UsePipes(ValidationPipe)
    @Delete('/:id')
    async delUser(@Param() params) {
        const { id } = params;

        const { result, msg } = await this.usersService.delUser(id);

        if (result) {
            return new Result(msg);
        } else {
            return new Result(msg, null, 'error');
        }
    }

}
