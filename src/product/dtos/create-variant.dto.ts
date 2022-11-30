import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  ValidateNested,
} from 'class-validator';
import { VariantOptionDTO } from './create-option.dto';

export class ProductVariantDTO {
  @ApiProperty()
  @IsNotEmpty({ message: 'The property <name> is required' })
  name: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'The property <mandatory> is required' })
  @IsBoolean({ message: 'Enter a boolean value for <mandatory> property' })
  mandatory: boolean;

  @ApiProperty({ type: Number })
  @IsNotEmpty({ message: 'The property <options_to_choose> is required' })
  @IsNumber(
    {},
    { message: 'Enter a valid number for <options_to_choose> property' },
  )
  options_to_choose: number;

  @ApiProperty({ type: [VariantOptionDTO] })
  @IsArray({ message: 'Enter a valid array for <options> property' })
  @ValidateNested({ each: true })
  @Type(() => VariantOptionDTO)
  options: VariantOptionDTO[];
}
