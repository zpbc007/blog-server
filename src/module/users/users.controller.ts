import { Controller, Get, UseGuards, Post, Inject, forwardRef, Body, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserLoginDto } from './dto/users.dto';
import { AuthService } from '../auth/auth.service';
import { UsersService } from './users.service';
import { Result } from 'src/common/dto/result.dto';
import { ValidationExceptionFactory } from 'src/exception/validation.exception';

@Controller('users')
export class UsersController {
    constructor(
        @Inject(forwardRef(() => AuthService))
        private readonly authService: AuthService,
        private readonly usersService: UsersService,
    ) {}
    /**
     * 获取用户列表
     */
    @Get('')
    @UseGuards(AuthGuard())
    userList() {
        return [];
    }

    @Post('/login')
    @UsePipes(new ValidationPipe({ exceptionFactory: ValidationExceptionFactory }))
    async login(@Body() userLoginDto: UserLoginDto) {
        const { msg, result, user } = await this.usersService.loginValidate(userLoginDto);

        if (!result) { // 登录失败
            return new Result(msg, null);
        }

        const token = await this.authService.signIn(user);

        return new Result<string>(msg, token);
    }

}
