import { Given, Then } from '@cucumber/cucumber';
import assert from 'assert';
import { response } from 'express';
import request from 'supertest';
import { application } from './hooks.steps';
import { wait } from './utils.steps';

let _request: request.Test;
let _response: request.Response;

Given('I send a GET request to {string}', async (route: string) => {
  _request = request(application.getHttpServer()).get(route);
  _response = await _request;

  wait(100);
});

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

/* Debug steps */
Then('the response should be visible in the console', () => {
  console.log(_request.url, _response.status, _response.body);
});
