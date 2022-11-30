import { Given, Then } from '@cucumber/cucumber';
import assert from 'assert';
import { response } from 'express';
import request from 'supertest';
import { application } from './hooks.steps';
import { wait } from './utils.steps';

let _request: request.Test;
let _response: request.Response;
let _token: string | null = null;

Given('I send a GET request to {string}', async (route: string) => {
  _request = request(application.getHttpServer()).get(route);
  _response = await _request;

  wait(100);
});

Given(
  'I send an authenticated GET request to {string}',
  async (route: string) => {
    if (!_token)
      throw new Error(
        'Error to authenticate the user. The token is not defined',
      );

    _request = request(application.getHttpServer())
      .get(route)
      .auth(_token, { type: 'bearer' });
    _response = await _request;

    wait(100);
  },
);

Given(
  'I send a POST request to {string} with body:',
  async (route: string, body: string) => {
    _request = request(application.getHttpServer())
      .post(route)
      .send(JSON.parse(body));
    _response = await _request;

    wait(100);
  },
);

Given(
  'I send an authenticated POST request to {string} with body:',
  async (route: string, body: string) => {
    if (!_token)
      throw new Error(
        'Error to authenticate the user. The token is not defined',
      );

    _request = request(application.getHttpServer())
      .post(route)
      .auth(_token, { type: 'bearer' })
      .send(JSON.parse(body));
    _response = await _request;

    wait(100);
  },
);

Given(
  'I send an authenticated PUT request to {string} with body:',
  async (route: string, body: string) => {
    if (!_token)
      throw new Error(
        'Error to authenticate the user. The token is not defined',
      );

    _request = request(application.getHttpServer())
      .put(route)
      .auth(_token, { type: 'bearer' })
      .send(JSON.parse(body));
    _response = await _request;

    wait(100);
  },
);

Given(
  'I send an authenticated PATCH request to {string} with body:',
  async (route: string, body: string) => {
    if (!_token)
      throw new Error(
        'Error to authenticate the user. The token is not defined',
      );

    _request = request(application.getHttpServer())
      .patch(route)
      .auth(_token, { type: 'bearer' })
      .send(JSON.parse(body));
    _response = await _request;

    wait(100);
  },
);

Given(
  'I send an authenticated DELETE request to {string}',
  async (route: string) => {
    if (!_token)
      throw new Error(
        'Error to authenticate the user. The token is not defined',
      );

    _request = request(application.getHttpServer())
      .delete(route)
      .auth(_token, { type: 'bearer' });
    _response = await _request;

    wait(100);
  },
);

Then('the response status code should be {int}', async (status: number) => {
  assert.deepStrictEqual(
    status,
    _response.status,
    `The code status was ${_response.status}`,
  );
});

Then('the response body should be empty', () => {
  assert.deepStrictEqual({}, _response.body);
});

Then('the response body should have an error message', () => {
  if (!_response['error'] && !response['message'])
    throw new Error('The response body not have an error message');
});

Then(
  'the response body should have the property {string}',
  (property: string) => {
    if (!_response.body[property])
      throw new Error(`The response not have the property ${property}`);
  },
);

Then('the response body should have an access token', async () => {
  if (!_response.body['token'])
    throw new Error('The response body not have an access token');

  _token = _response.body['token'];
});

/* Debug steps */
Then('the response should be visible in the console', () => {
  console.log(_request.url, _response.status, _response.body);
});
