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
import { CreateProductDTO } from './dtos/create-product.dto';
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
}
