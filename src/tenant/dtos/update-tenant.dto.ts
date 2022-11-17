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
  @Length(6, 30, { message: 'Please enter a valid name' })
  name?: string;

  @ApiProperty()
  @Length(6, 30, { message: 'Please enter a valid surname' })
  @IsOptional()
  surname?: string;
}
