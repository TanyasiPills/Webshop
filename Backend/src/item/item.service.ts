import { Injectable } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ItemService {

  constructor(private readonly db: PrismaService) {}
  
  create(createItemDto: CreateItemDto) {
    return this.db.shopItem.create({data: createItemDto});
  }

  findAll() {
    return this.db.shopItem.findMany();
  }

  findOne(id: number) {
    return this.db.shopItem.findFirst({where: {id}});
  }

  update(id: number, updateItemDto: UpdateItemDto) {
    return this.db.shopItem.update({where: {id}, data: updateItemDto});
  }

  remove(id: number) {
    return this.db.shopItem.delete({where: {id}});
  }
}
