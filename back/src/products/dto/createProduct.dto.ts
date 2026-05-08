import { IsString, IsNotEmpty, IsNumber, Min } from 'class-validator';
import { Type } from 'class-transformer';

export default class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  description!: string;

  @Type(() => Number)
  @IsNumber()
  @Min(0)
  price!: number;

  @IsString()
  @IsNotEmpty()
  category!: string;
}
