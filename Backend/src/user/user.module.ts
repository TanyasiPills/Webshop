import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from 'src/prisma.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthGuard } from 'src/auth/auth.guards';
import { APP_GUARD } from '@nestjs/core';
import { AuthModule } from 'src/auth/auth.module';
import { AuthService } from 'src/auth/auth.service';
import { TokenService } from 'src/token/token.service';

@Module({
  imports: [JwtModule],
  controllers: [UserController],
  providers: [UserService, PrismaService,{
    provide: APP_GUARD,
    useClass: AuthGuard,
  },AuthService,TokenService],
  exports: [UserService],
})
export class UserModule {}
