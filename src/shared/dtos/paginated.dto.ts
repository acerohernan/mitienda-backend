import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, Max } from 'class-validator';

export class PaginationQueryOptionsDTO {
  @ApiProperty()
  @IsInt({ message: 'The page must be a number' })
  @Type(() => Number)
  page?: number = 1;

  @ApiProperty()
  @IsInt({ message: 'The limit must be a number' })
  @Type(() => Number)
  @Max(30, { message: 'The max limit per page is 30' })
  limit?: number = 10;
}

export class PaginatedMetadataDTO {
  page: number;
  next_page: number;
  page_count: number;
  limit: number;
  has_previous_page: boolean;
  has_next_page: boolean;
  entities_count: number;

  constructor(
    entities_count: number,
    { limit, page }: PaginationQueryOptionsDTO,
  ) {
    this.page = page;
    this.next_page = page + 1;
    this.page_count = Math.ceil(entities_count / limit);
    this.limit = limit;
    this.has_next_page = page < this.page_count;
    this.has_previous_page = page > 1;
    this.entities_count = entities_count;
  }
}

export class PaginatedDTO<T> {
  public meta: PaginatedMetadataDTO;

  constructor(
    entities: Array<T>,
    entititesKey: string,
    meta: PaginatedMetadataDTO,
  ) {
    this[entititesKey] = entities;
    this.meta = meta;
  }
}
