import { Controller, Get, UseGuards, Post, Inject, forwardRef } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'src/auth/auth.service';

@Controller('users')
export class UsersController {
    constructor(
        @Inject(forwardRef(() => AuthService))
        public readonly authService: AuthService,
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
    async login() {
        const token = await this.authService.signIn({
            account: 'account',
            // 昵称
            nickname: '赵鹏',
            // 头像url
            avatar: 'url',
            // 是否启用
            enable: true,
        });

        return {
            token,
        };
    }

}
