import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty } from 'class-validator';

export class ProductImageDTO {
  @ApiProperty()
  @IsNotEmpty({ message: 'The <product image url> is required' })
  url: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'The <product featured> property is required' })
  @IsBoolean({
    message: 'Enter a valid boolean for <product featured> property',
  })
  featured: boolean;
}
