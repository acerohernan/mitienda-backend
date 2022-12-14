import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString, IsOptional, Length } from 'class-validator';

export class UpdateTenantDTO {
  @ApiProperty()
  @IsOptional()
  @IsNumberString({}, { message: 'Please enter a valid phone number' })
  @Length(6, 20, { message: 'Please enter a valid phone number' })
  phone?: string;

  @ApiProperty()
  @IsOptional()
  name?: string;

  @ApiProperty()
  @IsOptional()
  surname?: string;

  @ApiProperty()
  @IsOptional()
  profile_img?: string;
}
