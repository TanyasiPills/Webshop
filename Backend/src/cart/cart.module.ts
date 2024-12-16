import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { PrismaService } from 'src/prisma.service';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'src/auth/auth.guards';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from 'src/auth/auth.service';
import { UserModule } from 'src/user/user.module';
import { TokenService } from 'src/token/token.service';

@Module({
  imports: [JwtModule, UserModule],
  controllers: [CartController],
  providers: [CartService, PrismaService,{
    provide: APP_GUARD,
    useClass: AuthGuard,
  },AuthService,TokenService],
})
export class CartModule {}
