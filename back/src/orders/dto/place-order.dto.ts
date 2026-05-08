import { Type } from 'class-transformer';
import {
  IsArray,
  ValidateNested,
  IsNumber,
  IsObject,
  IsString,
  IsNotEmpty,
} from 'class-validator';

class AddressDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  address!: string;

  @IsString()
  @IsNotEmpty()
  city!: string;

  @IsString()
  @IsNotEmpty()
  phone!: string;
}

class OrderItemDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @Type(() => Number)
  @IsNumber()
  price!: number;

  @Type(() => Number)
  @IsNumber()
  quantity!: number;
}

export class PlaceOrderDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  items!: OrderItemDto[];

  @Type(() => Number)
  @IsNumber()
  amount!: number;

  @IsObject()
  @ValidateNested()
  @Type(() => AddressDto)
  address!: AddressDto;
}
