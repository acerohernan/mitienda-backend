import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginTenantDTO {
  @ApiProperty()
  @IsEmail({}, { message: 'Please enter a valid email' })
  email: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'The password is required' })
  password: string;
}
