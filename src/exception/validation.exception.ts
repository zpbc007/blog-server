import { ValidationError } from 'class-validator';
import { BadRequestException, HttpStatus } from '@nestjs/common';

// 处理ValidationPipe 错误
export function ValidationExceptionFactory(errors: ValidationError[]) {
    const errorObj = {};
    for (const { property, constraints } of errors) {
        errorObj[property] = constraints;
    }

    return new BadRequestException({
        status: HttpStatus.BAD_REQUEST,
        error: errorObj,
    });
}
