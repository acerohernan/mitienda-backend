export type PaginatedOptions = {
  page: number;
  entities_limit: number;
};

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
    { entities_limit, page }: PaginatedOptions,
  ) {
    this.page = page;
    this.next_page = page + 1;
    this.page_count = Math.ceil(entities_count / entities_limit);
    this.limit = entities_limit;
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
