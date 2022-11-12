import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, Matches } from 'class-validator';
import { IsEqualTo } from '../../shared/decorators/is-equal.decorator';

export class RestorePasswordDTO {
  @ApiProperty()
  @IsUUID()
  code: string;

  @ApiProperty()
  @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/, {
    message:
      'The password must have more than 8 characters, at least one uppercase letter and one number. Example: "Password1"',
  })
  password: string;

  @IsEqualTo<RestorePasswordDTO>('password', {
    message: 'The passwords do not match',
  })
  re_password: string;
}
