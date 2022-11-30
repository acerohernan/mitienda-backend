import { ApiPropertyOptional } from '@nestjs/swagger';
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

export class UpdateProductDTO {
  @ApiPropertyOptional({ type: 'string', nullable: true })
  @IsUUID('all', { message: 'Enter a valid uuid for category id' })
  @IsOptional()
  category_id?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNotEmpty({ message: 'The product name is required' })
  name?: string;

  @ApiPropertyOptional({ type: 'string', nullable: true })
  @IsOptional()
  sku?: string;

  @ApiPropertyOptional({ type: 'string', nullable: true })
  @IsOptional()
  description?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumberString({}, { message: 'Enter only number for price' })
  @IsNotEmpty({ message: 'The product price is required' })
  price?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumberString({}, { message: 'Enter only number for price' })
  @IsNotEmpty({ message: 'The product price is required' })
  offer_price?: string | null;

  @ApiPropertyOptional({ type: Number })
  @IsOptional()
  @IsNumber({}, { message: 'Enter a valid number for product stock' })
  @IsNotEmpty({ message: 'The product stock is required' })
  stock?: number;

  @ApiPropertyOptional({ type: [ProductVariantDTO] })
  @IsOptional()
  @IsArray({ message: 'The product variants must be in array' })
  @ValidateNested({ each: true })
  @Type(() => ProductVariantDTO)
  variants?: ProductVariantDTO[];
}
