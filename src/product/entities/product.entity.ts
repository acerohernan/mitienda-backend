import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ProductVariant } from '../types';

@Entity({
  name: 'store_products',
})
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
  })
  store_id: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  category_id: string | null;

  @Column({
    type: 'varchar',
  })
  name: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  sku: string | null;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  description: string | null;

  @Column({
    type: 'int',
  })
  price: number;

  @Column({
    type: 'int',
    nullable: true,
  })
  offer_price: number | null;

  @Column({
    type: 'varchar',
  })
  stock: number;

  @Column({
    type: 'json',
    nullable: true,
  })
  variants: Array<ProductVariant>;
}
