import { IsBoolean, IsDecimal, IsNotEmpty, isString, IsString } from "class-validator";
import { ShopItem, User } from "@prisma/client";

export class CreateCartDto {

    @IsNotEmpty()
    user: User

    @IsNotEmpty()
    item?: ShopItem[]
}
