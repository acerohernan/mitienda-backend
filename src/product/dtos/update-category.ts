import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateProductCategoryDTO {
  @ApiPropertyOptional()
  @IsNotEmpty({ message: 'The property <name> is required' })
  @IsOptional()
  name?: string;

  @ApiPropertyOptional()
  @IsNotEmpty({ message: 'The property <img_url> is required' })
  @IsOptional()
  img_url?: string;
}
