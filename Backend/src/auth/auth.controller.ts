
import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './constants';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body("stuff") stuff: string, @Body("pass") pass: string) {
    console.log("fak u");
    
    console.log(stuff);
    console.log(pass);
    
    return this.authService.signIn(stuff, pass);
  }
}
