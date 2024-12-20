
import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
  import { JwtService } from '@nestjs/jwt';
  import { IS_PUBLIC_KEY, jwtConstants } from './constants';
  import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { AuthService } from './auth.service';
  
  @Injectable()
  export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService, private reflector: Reflector,private authService: AuthService) {}
  
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        
        if (isPublic) {
            return true;
        }

        const request = context.switchToHttp().getRequest();

        if (request.method === 'OPTIONS') {
          return true;
        }

        const token = this.extractTokenFromHeader(request);
        if (!token) {
          throw new UnauthorizedException();
        }
        try {
          const payload = await this.jwtService.verifyAsync(
                token,
                {
                secret: jwtConstants.secret
                }
            );

            request['user'] = payload;
        } catch {
          await this.authService.deleteToken(token);
          throw new UnauthorizedException();
        }
        return true;
    }
  
    private extractTokenFromHeader(request: Request): string | undefined {
      const [type, token] = request.headers.authorization?.split(' ') ?? [];
      return type === 'Bearer' ? token : undefined;
    }
  }
  