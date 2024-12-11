import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post(':id')
  create(@Body() createCartDto: CreateCartDto, @Param('id') id: string) {
    return this.cartService.create(createCartDto, +id);
  }

  @Get()
  findAll() {
    return this.cartService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cartService.findOne(+id);
  }

  @Patch(':id/:itemId')
  AddItem(@Req() req,@Param('itemId') itemId: string) {
    const id = req.user.sub;
    return this.cartService.addItem(+id, +itemId);
  }

  @Patch(':id')
  RemoveItem(@Param('id') id: string,@Param('itemId') itemId: string) {
    return this.cartService.removeItem(+id, +itemId);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cartService.remove(+id);
  }
}
