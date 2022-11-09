import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class LoginTenantDTO {
  @ApiProperty()
  @IsEmail({}, { message: 'Please enter a valid email' })
  email: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'The password is required' })
  password: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'The store is required' })
  @MinLength(6, { message: 'The store is invalid' })
  store: string;
}
