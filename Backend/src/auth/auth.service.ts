import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';
import { TokenService } from 'src/token/token.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
    private readonly db: PrismaService,
    private tokenService: TokenService
  ) {}

  async signIn(
    identification: string,
    pass: string,
  ): Promise<{ access_token: string }> {
    
    const user = await this.usersService.findUser(identification);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, username: user.username };
    const token = await this.jwtService.signAsync(payload)
    this.tokenService.createToken(user.id, token);
    return {
      access_token: token,
    };
  }
  async getUserFromToken(token: string) {
    try {
      const decoded = this.jwtService.decode(token) as { sub: number };
      if (!decoded || !decoded.sub) {
        throw new UnauthorizedException();
      }
      return decoded.sub;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
  async deleteToken(token: string): Promise<void> {
    await this.tokenService.remove(token);
  }
}