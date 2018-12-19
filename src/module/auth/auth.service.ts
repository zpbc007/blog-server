import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interface/jwt_payload.interface';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
    constructor(
        @Inject(forwardRef(() => UsersService))
        private readonly userService: UsersService,
        private readonly jwtService: JwtService,
    ) {}

    async signIn(payload: JwtPayload) {
        return this.jwtService.sign(payload);
    }

    async validateUser(payload: JwtPayload) {
        return await this.userService.findOneByAccount(payload.account);
    }
}
