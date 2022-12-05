import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateProductCategoryDTO {
  @ApiProperty()
  @IsUUID('all', { message: 'Enter a valid uuid for for the new product id' })
  id: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'The property <name> is required' })
  name: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'The property <img_url> is required' })
  img_url: string;
}
