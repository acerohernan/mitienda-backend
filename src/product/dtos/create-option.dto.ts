import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumberString } from 'class-validator';

export class VariantOptionDTO {
  @ApiProperty()
  @IsNotEmpty({ message: 'The <name> property is required' })
  name: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'The <price> property is required' })
  @IsNumberString({}, { message: 'Enter only number for <price> property' })
  price: string;
}
