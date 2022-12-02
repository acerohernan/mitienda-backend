import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ProductImageDTO } from '../dtos/create-product-image';
import { ProductVariantDTO } from '../dtos/create-variant.dto';

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
    type: 'varchar',
  })
  price: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  offer_price: string | null;

  @Column({
    type: 'varchar',
  })
  stock: number;

  @Column({
    type: 'json',
    default: [],
  })
  variants: Array<ProductVariantDTO>;

  @Column({
    type: 'json',
    default: [],
  })
  images: Array<ProductImageDTO>;
}
