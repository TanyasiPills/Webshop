import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UserService {

  constructor(private readonly db: PrismaService) {}

  create(createUserDto: CreateUserDto) {
    return this.db.user.create({data: createUserDto});
  }

  findAll() {
    return this.db.user.findMany();
  }

  findOne(id: number) {
    return this.db.user.findFirst({where: {id}});
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.db.user.update({where: {id: id}, data: updateUserDto});
  }

  remove(id: number) {
    return this.db.user.delete({where: {id}});
  }

  async findUser(identification : string){
    const stuff1 = await this.db.user.findFirst({where: {username: identification}});
    const stuff2 = await this.db.user.findFirst({where: {email: identification}});
    if(stuff1) return stuff1;
    else if(stuff2) return stuff2;
    else return undefined;
  }
}
