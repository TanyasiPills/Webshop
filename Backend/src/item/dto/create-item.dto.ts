import { IsBoolean, IsDecimal, IsNotEmpty, IsNumber, isString, IsString } from "class-validator";
import { ShopCart, ShopItem, User } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";

export class CreateItemDto {
    @IsNotEmpty()
    @IsString()
    name: string

    @IsNotEmpty()
    @IsDecimal()
    purity: Decimal

    @IsNotEmpty()
    @IsNumber()
    price: number

    @IsNotEmpty()
    @IsNumber()
    rating: number

}
