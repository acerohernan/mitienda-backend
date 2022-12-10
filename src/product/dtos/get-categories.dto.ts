import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, Max } from 'class-validator';

export class GetProductCategoriesDTO {
  @ApiProperty()
  @IsInt({ message: 'The page must be a number' })
  @Type(() => Number)
  page?: number = 1;

  @ApiProperty()
  @IsInt({ message: 'The limit must be a number' })
  @Type(() => Number)
  @Max(30, { message: 'The max limit per page is 30' })
  limit?: number = 10;

  @ApiProperty()
  @IsInt({ message: 'The number of products must be a number' })
  @Type(() => Number)
  @Max(10, { message: 'The max number of products per category is 10' })
  products?: number = 0;
}
