import { IsEmail, IsNumberString, Length, Matches } from 'class-validator';

export class CreateTenantDTO {
  @IsEmail({}, { message: 'Please enter a valid email' })
  email: string;

  @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/, {
    message:
      'The password must have more than 8 characters, at least one uppercase letter and one number. Example: "Password1"',
  })
  password: string;

  @IsNumberString({}, { message: 'Please enter a valid phone number' })
  @Length(6, 20, { message: 'Please enter a valid phone number' })
  phone: string;
}
