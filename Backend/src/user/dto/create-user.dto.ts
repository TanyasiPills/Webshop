import { IsBoolean, IsDecimal, IsNotEmpty, IsNumber, isString, IsString } from "class-validator";
import { ShopCart, ShopItem, User } from "@prisma/client";

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    username: string

    @IsNotEmpty()
    @IsString()
    password: string
    
    @IsNotEmpty()
    @IsString()
    email: string
}
