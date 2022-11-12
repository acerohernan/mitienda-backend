export enum TenantStatus {
  EXPIRED = 0,
  ACTIVE = 1,
  IN_REGISTRATION = 2,
}
export type TenantCountry = {
  name: string;
  code: string;
  prefix_number: string;
  currency_symbol: string;
  currency_code: string;
};
