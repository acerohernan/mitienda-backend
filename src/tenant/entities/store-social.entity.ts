import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'store_socials',
})
export class StoreSocial {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    unique: true,
  })
  store_id: string;

  @Column({
    type: 'varchar',
    nullable: true,
    default: null,
  })
  facebook: string | null;

  @Column({
    type: 'varchar',
    nullable: true,
    default: null,
  })
  instagram: string | null;

  @Column({
    type: 'varchar',
    nullable: true,
    default: null,
  })
  pinterest: string | null;

  @Column({
    type: 'varchar',
    nullable: true,
    default: null,
  })
  twitter: string | null;

  @Column({
    type: 'varchar',
    nullable: true,
    default: null,
  })
  tiktok: string | null;

  @Column({
    type: 'varchar',
    nullable: true,
    default: null,
  })
  youtube: string | null;
}
