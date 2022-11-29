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
