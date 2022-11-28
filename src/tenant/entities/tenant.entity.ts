import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { TenantStatus } from '../types/tenant.types';

@Entity({
  name: 'tenants',
})
export class Tenant {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  store_id: string | null;

  @Column({
    type: 'int',
    enum: TenantStatus,
    default: 1,
  })
  status: number;

  @Column({
    type: 'date',
    nullable: true,
  })
  expiration_date: Date;

  @Column({
    type: 'varchar',
    unique: true,
  })
  email: string;

  @Column({
    type: 'varchar',
  })
  password: string;

  @Column({
    type: 'varchar',
  })
  phone: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  name: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  surname: string;

  @Column({
    type: 'varchar',
  })
  country: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  profile_img: string;
}
