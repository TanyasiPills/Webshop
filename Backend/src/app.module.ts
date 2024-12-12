import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { CartModule } from './cart/cart.module';
import { ItemModule } from './item/item.module';
import { PrismaService } from './prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/auth.guards';
import { AuthModule } from './auth/auth.module';
import { TokenModule } from './token/token.module';

@Module({
  imports: [UserModule, CartModule, ItemModule, JwtModule, AuthModule, TokenModule],
  controllers: [AppController],
  providers: [AppService, PrismaService,{
    provide: APP_GUARD,
    useClass: AuthGuard,
  }],
})
export class AppModule {}
