import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from 'src/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from 'src/auth/auth.guards';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [JwtModule],
  controllers: [UserController],
  providers: [UserService, PrismaService,{
    provide: APP_GUARD,
    useClass: AuthGuard,
  },],
})
export class UserModule {}
