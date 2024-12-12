
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { jwtConstants } from './constants';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth.guards';
import { TokenService } from 'src/token/token.service';
import { TokenModule } from 'src/token/token.module';

@Module({
  imports: [
    UserModule,
    TokenModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [{
    provide: APP_GUARD,
    useClass: AuthGuard,
  },AuthService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
