import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from 'src/auth/constants';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Public()
  @Get()
  @Render('index')
  getHello() {
    return {
      message: this.appService.getHello()
    };
  }
}
