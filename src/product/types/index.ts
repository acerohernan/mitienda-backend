import { Product } from '../entities/product.entity';

export type ProductVariant = {
  name: string;
  mandatory: boolean;
  options_to_choose: number;
  options: Array<ProductVariantOption>;
};

export type ProductVariantOption = {
  name: string;
  price: number;
};

export type ProductCategoryWithProducts = {
  id: string;
  name: string;
  img_url: string;
  products: Array<Product>;
};
