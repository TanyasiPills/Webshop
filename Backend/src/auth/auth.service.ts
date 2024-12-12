import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService
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
    return {
      access_token: await this.jwtService.signAsync(payload),
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
}