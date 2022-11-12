import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'tenant_stores',
})
export class Store {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    unique: true,
  })
  tenant_id: string;

  @Column({
    type: 'varchar',
  })
  name: string;

  @Column({
    type: 'varchar',
    unique: true,
  })
  domain: string;

  @Column({
    type: 'varchar',
  })
  whatsapp: string;

  @Column({
    type: 'varchar',
  })
  telephone: string;

  @Column({
    type: 'varchar',
  })
  category: string;

  @Column({
    type: 'varchar',
  })
  country: string;

  @Column({
    type: 'varchar',
  })
  currency: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  logo_img: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  banner_img: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  description: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  team_img: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  team_description: string;
}
