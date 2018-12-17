import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
    async findOneByAccount(account: string) {
        return {};
    }
}
