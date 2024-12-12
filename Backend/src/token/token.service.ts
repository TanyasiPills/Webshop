import { Injectable } from '@nestjs/common';
import { CreateTokenDto } from './dto/create-token.dto';
import { UpdateTokenDto } from './dto/update-token.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class TokenService {

  constructor(private readonly db: PrismaService) {}

  createToken(id: number, token: string) {
    return this.db.tokens.create({data: {userId: id, token: token}})
  }

  findOne(token: string) {
    return this.db.tokens.findFirst({where:{token: token}});
  }

  remove(token: string) {
    return this.db.tokens.deleteMany({where: {token: token}});
  }
}
