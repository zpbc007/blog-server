import { Controller, Get, UseGuards, Post, Inject, forwardRef, Body, UsePipes, ValidationPipe, BadRequestException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserLoginDto } from './dto/user_login.dto';
import { AuthService } from '../auth/auth.service';
import { UsersService } from './users.service';
import { Result } from 'src/common/dto/result.dto';
import { UserModifyDto } from './dto/user_modify.dto';

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

        const token = await this.authService.signIn(user);

        return new Result<string>(msg, token);
    }

    /**
     * 获取用户列表
     */
    @Get('')
    @UseGuards(AuthGuard())
    userList() {
        return [];
    }

    /**
     * 新建用户
     */
    // @UseGuards(AuthGuard())
    // @UsePipes(ValidationPipe)
    @Post('/')
    async addUser(@Body() userModifyDto: UserModifyDto) {
        if (userModifyDto.password !== userModifyDto.confirm_password) {
            throw new BadRequestException('两次密码不一致');
        }
        const { result, msg, data } = await this.usersService.addUser(userModifyDto);

        if (result) {
            return new Result(msg, data);
        } else {
            return new Result(msg, data, 'error');
        }

    }

}
