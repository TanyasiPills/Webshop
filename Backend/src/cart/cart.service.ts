import { Injectable } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CartService {

  constructor(private readonly db: PrismaService) {}

  async create(createCartDto: CreateCartDto, id: number) {
    return this.db.shopCart.create({data: {userId: id}});
  }

  findAll() {
    return this.db.shopCart.findMany();
  }

  findOne(id: number) {
    return this.db.shopCart.findFirst({where: {id}});
  }

  addItem(id: number, itemId: number) {
    return this.db.shopCart.update({where:{userId: id},data: {items: {connect: {id: itemId}}}});
  }

  removeItem(id: number, itemId: number) {
    return this.db.shopCart.update({where:{userId: id},data: {items: {disconnect: {id: itemId}}}});
  }

  remove(id: number) {
    return `This action removes a #${id} cart`;
  }
}
