import { HttpStatus } from '@nestjs/common';
import * as request from 'supertest';
import { server } from './app.e2e-spec';

describe('Tenant', () => {
  it('(POST) /tenant/auth/signup', async () => {
    return request(server)
      .post('/tenant/auth/signup')
      .send({
        email: 'test1@ŧest.com',
        password: 'Password1',
        phone: '999113934',
      })
      .expect(HttpStatus.CREATED);
  });
});
