import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { pick } from 'lodash';
import { Repository } from 'typeorm';
import { validate as validateUUid } from 'uuid';
import {
  PaginatedDTO,
  PaginatedMetadataDTO,
  PaginationQueryOptionsDTO,
} from '../shared/dtos/paginated.dto';
import { CreateProductCategoryDTO } from './dtos/create-category.dto';
import { CreateProductDTO } from './dtos/create-product.dto';
import { UpdateProductCategoryDTO } from './dtos/update-category';
import { UpdateProductDTO } from './dtos/update-product.dto';
import { ProductCategory } from './entities/category.entity';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
    @InjectRepository(ProductCategory)
    private categoryRepository: Repository<ProductCategory>,
  ) {}

  async create(dto: CreateProductDTO, store_id: string): Promise<void> {
    const {
      id,
      name,
      offer_price,
      price,
      stock,
      category_id,
      description,
      sku,
      variants,
      images,
    } = dto;

    /* Verify if exists a product with the same id */
    const exists = await this.productRepository.findOneBy({ id });

    if (exists)
      throw new BadRequestException('The product with the same id exists');

    /* Saves the product */
    const product = this.productRepository.create({
      id,
      store_id,
      category_id: category_id || null,
      description: description || null,
      sku: sku || null,
      name,
      offer_price,
      price,
      stock,
      variants,
      images,
    });

    await this.productRepository.save(product);
  }

  async getProduct(id: string): Promise<{ product: Product }> {
    /* Validate the id */
    const isValid = validateUUid(id);

    if (!isValid)
      throw new BadRequestException(`The value <${id}> is not a valid uuid`);

    /* Find the product */
    const product = await this.productRepository.findOneBy({ id });

    if (!product)
      throw new NotFoundException(`The product with id <${id}> not exists`);

    return { product };
  }

  async updateProduct(
    id: string,
    store_id: string,
    dto: UpdateProductDTO,
  ): Promise<void> {
    /* Pick only the product editable properties */
    const editableFields: Array<keyof UpdateProductDTO> = [
      'category_id',
      'description',
      'name',
      'offer_price',
      'price',
      'sku',
      'stock',
      'variants',
      'images',
    ];

    const informationToEdit = pick(dto, editableFields);

    /* Find the product */
    const product = await this.productRepository.findOneBy({ id });

    if (!product)
      throw new NotFoundException(`The product with id <${id}> not exists`);

    /* Verify if the requester is the owner of the store */
    const isOwner = product.store_id === store_id;

    if (!isOwner)
      throw new ForbiddenException(
        'You not have permission to update this resourse',
      );

    /* Update the product */
    await this.productRepository.update({ id }, informationToEdit);
  }

  async deleteProduct(id: string, store_id: string) {
    /* Verify if the product exist */
    const product = await this.productRepository.findOneBy({ id });

    if (!product)
      throw new NotFoundException(`The product with id <${id}> not exists`);

    /* Verify if the requester is the owner */
    const isOwner = product.store_id === store_id;

    if (!isOwner)
      throw new ForbiddenException(
        'You not have permissions to delete this resource',
      );

    /* Delete the product */
    await this.productRepository.delete({ id });
  }

  async getAllFromStore(
    store_id: string,
    opts: PaginationQueryOptionsDTO,
  ): Promise<PaginatedDTO<Product>> {
    /* Validate if is a valid store_id */
    const isValid = validateUUid(store_id);

    if (!isValid)
      throw new BadRequestException(
        `The store_id <${store_id}> is an invalid uuid`,
      );

    /* Define the query parameters */
    let limit = opts.limit || 10;
    let page = opts.page || 1;
    let offset = Math.ceil((page - 1) * limit);

    /* Initializaing the query builder */
    const queryBuilder =
      this.productRepository.createQueryBuilder('store_products');

    queryBuilder
      .skip(offset)
      .take(limit)
      .where('store_id = :store_id', { store_id });

    const products_count = await queryBuilder.getCount();
    const products = await queryBuilder.getMany();

    /* Creating the metada information */
    const meta_information = new PaginatedMetadataDTO(products_count, {
      limit,
      page,
    });

    /* Return the products with metada */
    return new PaginatedDTO<Product>(products, 'products', meta_information);
  }

  async createProductCategory(dto: CreateProductCategoryDTO, store_id: string) {
    const { id, img_url, name } = dto;

    /* Verify if the category exist */
    const exists = await this.categoryRepository.findOneBy({ id });

    if (exists)
      throw new BadRequestException(
        `Already exists a category with id <${id}>`,
      );

    /* Save the category */
    const category = this.categoryRepository.create({
      id,
      store_id,
      img_url,
      name,
    });

    await this.categoryRepository.save(category);
  }

  async updateProductCategory(
    category_id: string,
    dto: UpdateProductCategoryDTO,
    store_id: string,
  ) {
    /* Verify is the category exists */
    const category = await this.categoryRepository.findOneBy({
      id: category_id,
    });

    if (!category)
      throw new NotFoundException(
        `The category with id <${category_id}> not exists`,
      );

    /* Verify if the user is the owner */
    const isOwner = category.store_id === store_id;

    if (!isOwner)
      throw new ForbiddenException(
        'You not have permission to update this resource',
      );

    /* Update the category */
    const editableFields: Array<keyof UpdateProductCategoryDTO> = [
      'img_url',
      'name',
    ];

    const categoryToUpdate = pick(dto, editableFields);

    await this.categoryRepository.update({ id: category_id }, categoryToUpdate);
  }

  async deleteProductCategory(category_id: string, store_id: string) {
    /* Verify is the category exists */
    const category = await this.categoryRepository.findOneBy({
      id: category_id,
    });

    if (!category)
      throw new NotFoundException(
        `The category with id <${category_id}> not exists`,
      );

    /* Verify if the user is the owner */
    const isOwner = category.store_id === store_id;

    if (!isOwner)
      throw new ForbiddenException(
        'You not have permission to update this resource',
      );

    /* Delete the category */
    await this.categoryRepository.delete({ id: category_id });
  }

  async getCategoriesFromOwnStore(
    store_id: string,
  ): Promise<{ categories: Array<ProductCategory> }> {
    const categories = await this.categoryRepository.findBy({ store_id });

    return { categories };
  }
}
