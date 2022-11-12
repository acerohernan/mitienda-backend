import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'tenant_tiers',
})
export class Tier {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
  })
  name: string;

  @Column({
    type: 'int',
  })
  price: number;

  @Column({
    type: 'int',
  })
  duration_in_days: number;

  @Column({
    type: 'int',
  })
  duration_in_months: number;
}
