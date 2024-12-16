import { Module } from '@nestjs/common';
import { ItemService } from './item.service';
import { ItemController } from './item.controller';
import { PrismaService } from 'src/prisma.service';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'src/auth/auth.guards';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from 'src/auth/auth.service';
import { UserModule } from 'src/user/user.module';
import { TokenService } from 'src/token/token.service';

@Module({
  imports: [JwtModule,UserModule],
  controllers: [ItemController],
  providers: [ItemService, PrismaService,{
    provide: APP_GUARD,
    useClass: AuthGuard,
  },AuthService,TokenService],
})
export class ItemModule {}
