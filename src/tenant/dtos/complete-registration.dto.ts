import { IsNotEmpty, Length, Matches } from 'class-validator';
import { noSpacesRegEx } from '../../shared/utils/regexp';

export class CompleteRegistrationDTO {
  @Length(8, 30, {
    message:
      'The name of your store must have minimun 8 caracters and maximun 30',
  })
  store_name: string;

  @Length(6, 20, {
    message:
      'The name of your store must have minimun 6 caracters and maximun 20',
  })
  @Matches(noSpacesRegEx, { message: 'The store domain must not have spaces' })
  store_domain: string;

  @IsNotEmpty({ message: 'The store category is required' })
  store_category: string;

  @Length(8, 30, {
    message: 'Your name must have minimun 8 caracters and maximun 30',
  })
  tenant_name: string;

  @Length(8, 30, {
    message: 'Your surname must have minimun 8 caracters and maximun 30',
  })
  tenant_surname: string;
}
