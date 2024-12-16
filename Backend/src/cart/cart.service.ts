import { Injectable } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CartService {

  constructor(private readonly db: PrismaService) {}

  async create(id: number) {
    return this.db.shopCart.create({data: {userId: id}});
  }

  findAll() {
    return this.db.shopCart.findMany();
  }

  findOne(id: number) {
    return this.db.shopCart.findFirst({where: {userId: id}, include: {items: true}});
  }

  async addItem(id: number, itemId: number) {
    return await this.db.shopCart.update({
      where: { userId: id },
      data: { items: { connect: { id: itemId } } }, include: {items: true}
    });
  }

  removeItem(id: number, itemId: number) {
    return this.db.shopCart.update({where:{userId: id},data: {items: {disconnect: {id: itemId}}}});
  }

  async remove(id: number) {
    const cart = await this.db.shopCart.findUnique({
      where: { userId: id },
      include: { items: true },
    });
    return this.db.shopCart.update({where:{userId: id},data: {items: {disconnect: cart.items.map((item) => ({ id: item.id }))}}, include: {items: true}});
  }
}
