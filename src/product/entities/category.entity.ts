import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'store_product_categories' })
export class ProductCategory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
  })
  store_id: string;

  @Column({
    type: 'varchar',
  })
  name: string;

  @Column({
    type: 'varchar',
  })
  img_url: string | null;
}
