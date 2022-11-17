import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString, IsOptional, Length } from 'class-validator';

export class UpdateStoreDTO {
  @ApiProperty()
  @IsOptional()
  @Length(6, 30, { message: 'Please enter a valid name' })
  name?: string;

  @ApiProperty()
  @IsOptional()
  @IsNumberString(
    {},
    {
      message: 'Please enter a valid whatsapp number, only numeric characters',
    },
  )
  whatsapp?: string;

  @ApiProperty()
  @IsOptional()
  @IsNumberString(
    {},
    {
      message: 'Please enter a valid telephone number, only numeric characters',
    },
  )
  telephone?: string;

  @ApiProperty()
  @IsOptional()
  @Length(6, 40, { message: 'Please enter a valid category' })
  category?: string;

  @ApiProperty()
  @IsOptional()
  currency?: string;

  @ApiProperty()
  @IsOptional()
  logo_img?: string;

  @ApiProperty()
  @IsOptional()
  banner_img?: string;

  @ApiProperty()
  @IsOptional()
  description?: string;

  @ApiProperty()
  @IsOptional()
  team_img?: string;

  @ApiProperty()
  @IsOptional()
  team_description?: string;
}
