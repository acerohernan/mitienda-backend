import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export type AuthTenant = {
  tenant_id: string;
  store_id: string;
};

export const AuthTenantRequest = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    if (!request.user) throw new Error('The request user is not defined');

    return request.user as AuthTenant;
  },
);
