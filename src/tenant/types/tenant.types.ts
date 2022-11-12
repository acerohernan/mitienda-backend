export enum TenantStatus {
  INACTIVE = 0,
  ACTIVE = 1,
  EXPIRED = 1,
}
export type TenantCountry = {
  name: string;
  code: string;
  prefix_number: string;
  currency_symbol: string;
  currency_code: string;
};
