import { IsBoolean, IsDecimal, IsInt, IsNotEmpty, IsNumber, isString, IsString } from "class-validator";
import { ShopItem, User } from "@prisma/client";

export class CreateCartDto {

    @IsNotEmpty()
    @IsInt()
    userId: number

    @IsNotEmpty()
    item?: ShopItem[]
}
