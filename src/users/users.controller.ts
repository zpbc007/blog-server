import { Controller, Get } from '@nestjs/common';

@Controller('users')
export class UsersController {
    @Get('/test')
    test() {
        return '123';
    }
}
