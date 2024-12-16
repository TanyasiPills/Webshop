import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { Public } from 'src/auth/constants';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Public()
  @Post(':id')
  create(@Param('id') id: string) {
    return this.cartService.create(+id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cartService.findOne(+id);
  }

  @Patch(':id/:itemId')
  async AddItem(@Param('id') id: string,@Param('itemId') itemId: string) {
    return await this.cartService.addItem(+id, +itemId);
  }

  @Delete(':id/:itemId')
  RemoveItem(@Param('id') id: string,@Param('itemId') itemId: string) {
    return this.cartService.removeItem(+id, +itemId);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cartService.remove(+id);
  }
}
