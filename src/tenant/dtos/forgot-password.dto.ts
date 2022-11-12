import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional } from 'class-validator';

export class ForgotPasswordDTO {
  @ApiProperty()
  @IsEmail({}, { message: 'Please enter a valid email' })
  email: string;

  @IsOptional()
  code?: string;
}
