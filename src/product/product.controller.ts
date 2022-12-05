import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  AuthTenant,
  AuthTenantRequest,
} from '../shared/decorators/auth-tenant.decorator';
import { PaginationQueryOptionsDTO } from '../shared/dtos/paginated.dto';
import { AuthGuard } from '../shared/guards/auth.guard';
import { CreateProductCategoryDTO } from './dtos/create-category.dto';
import { CreateProductDTO } from './dtos/create-product.dto';
import { UpdateProductCategoryDTO } from './dtos/update-category';
import { UpdateProductDTO } from './dtos/update-product.dto';
import { ProductService } from './product.service';

@ApiTags('Product')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('store/:storeId')
  async getAllProductsFromStore(
    @Param('storeId') storeId: string,
    @Query() { limit, page }: PaginationQueryOptionsDTO,
  ) {
    return this.productService.getAllFromStore(storeId, {
      page: Number(page),
      limit: Number(limit),
    });
  }

  @Get('store')
  @UseGuards(AuthGuard)
  async getAllProductsOwnStore(
    @Query() { limit, page }: PaginationQueryOptionsDTO,
    @AuthTenantRequest() { store_id }: AuthTenant,
  ) {
    return this.productService.getAllFromStore(store_id, {
      page: Number(page),
      limit: Number(limit),
    });
  }

  @Post()
  @UseGuards(AuthGuard)
  async createProduct(
    @Body() dto: CreateProductDTO,
    @AuthTenantRequest() tenant: AuthTenant,
  ) {
    return this.productService.create(dto, tenant.store_id);
  }

  @Get(':productId')
  async getProduct(@Param('productId') productId: string) {
    return this.productService.getProduct(productId);
  }

  @UseGuards(AuthGuard)
  @Patch(':productId')
  async updateProduct(
    @Param('productId') productId: string,
    @Body() dto: UpdateProductDTO,
    @AuthTenantRequest() tenant: AuthTenant,
  ) {
    return this.productService.updateProduct(productId, tenant.store_id, dto);
  }

  @UseGuards(AuthGuard)
  @Delete(':productId')
  async deleteProduct(
    @Param('productId') productId: string,
    @AuthTenantRequest() tenant: AuthTenant,
  ) {
    return this.productService.deleteProduct(productId, tenant.store_id);
  }

  @UseGuards(AuthGuard)
  @Get('category/store')
  async getCategoriesFromOwnStore(@AuthTenantRequest() tenant: AuthTenant) {
    return this.productService.getCategoriesFromOwnStore(tenant.store_id);
  }

  @UseGuards(AuthGuard)
  @Post('category')
  async createProductCategory(
    @Body() dto: CreateProductCategoryDTO,
    @AuthTenantRequest() tenant: AuthTenant,
  ) {
    return this.productService.createProductCategory(dto, tenant.store_id);
  }

  @UseGuards(AuthGuard)
  @Patch('category/:categoryId')
  async updateProductCategory(
    @Param('categoryId') categoryId: string,
    @Body() dto: UpdateProductCategoryDTO,
    @AuthTenantRequest() tenant: AuthTenant,
  ) {
    return this.productService.updateProductCategory(
      categoryId,
      dto,
      tenant.store_id,
    );
  }

  @UseGuards(AuthGuard)
  @Delete('category/:categoryId')
  async deleteProductCategory(
    @Param('categoryId') categoryId: string,
    @AuthTenantRequest() tenant: AuthTenant,
  ) {
    return this.productService.deleteProductCategory(
      categoryId,
      tenant.store_id,
    );
  }
}
