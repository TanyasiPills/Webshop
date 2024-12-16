
import { Body, Controller, Post, HttpCode, HttpStatus, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './constants';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('login')
  signIn(@Body("stuff") stuff: string, @Body("pass") pass: string) {  
    return this.authService.signIn(stuff, pass);
  }

  @Post('id')
  getUser(@Body("token") token: string) {  
    return this.authService.getUserFromToken(token);
  }

}
