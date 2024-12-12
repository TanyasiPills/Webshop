import { IsBoolean, IsDecimal, IsNotEmpty, IsNumber, isString, IsString } from "class-validator";
import { ShopCart, ShopItem, User } from "@prisma/client";

export class CreateTokenDto {
    @IsNotEmpty()
    @IsNumber()
    userId: number

    @IsNotEmpty()
    @IsString()
    token: string
}
