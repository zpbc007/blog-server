import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { JwtStrategy } from './jwt.strategy';
import { config } from 'server.config';

@Module({
  imports: [
    JwtModule.register({
      secretOrPrivateKey: config.jwt.secretKey,
      signOptions: {
        expiresIn: config.jwt.expiresIn,
      },
    }),
    forwardRef(() => UsersModule),
  ],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
