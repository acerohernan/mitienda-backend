import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { ProductVariantDTO } from './create-variant.dto';

export class CreateProductDTO {
  @ApiProperty()
  @IsUUID('all', { message: 'Enter a valid uuid for for the new product id' })
  id: string;

  @ApiProperty({ type: 'string', nullable: true })
  @IsUUID('all', { message: 'Enter a valid uuid for category id' })
  @IsOptional()
  category_id?: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'The product name is required' })
  name: string;

  @ApiProperty({ type: 'string', nullable: true })
  @IsOptional()
  sku?: string;

  @ApiProperty({ type: 'string', nullable: true })
  @IsOptional()
  description?: string;

  @ApiProperty()
  @IsNumberString({}, { message: 'Enter only number for price' })
  @IsNotEmpty({ message: 'The product price is required' })
  price: string;

  @ApiProperty()
  @IsNumberString({}, { message: 'Enter only number for price' })
  @IsNotEmpty({ message: 'The product price is required' })
  offer_price: string | null;

  @ApiProperty({ type: Number })
  @IsNumber({}, { message: 'Enter a valid number for product stock' })
  @IsNotEmpty({ message: 'The product stock is required' })
  stock: number;

  @ApiProperty({ type: [ProductVariantDTO] })
  @IsArray({ message: 'The product variants must be in array' })
  @ValidateNested({ each: true })
  @Type(() => ProductVariantDTO)
  variants: ProductVariantDTO[];
}
