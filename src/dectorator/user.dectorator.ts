import { createParamDecorator } from '@nestjs/common';

// tslint:disable-next-line:variable-name
export const User = createParamDecorator((data, req) => {
    return req.user;
});
