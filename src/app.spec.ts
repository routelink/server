import request from 'supertest';
import { beforeEach, describe, expect, test } from 'vitest';

import App from './app';

describe('app', () => {
  let app: App;
  beforeEach(() => {
    app = new App();
  });

  test('create', () => {
    expect(app).toBeInstanceOf(App);
  });

  test('get /healthz', async () => {
    const response = await request(app.app)
      .get('/healthz')
      .set('Content-Type', 'application/json')
      .expect('Content-Type', /json/);
    expect(response.status).toEqual(200);
    expect(response.body).haveOwnProperty('message');
    expect(response.body).haveOwnProperty('uptime');
    expect(response.body).haveOwnProperty('timestamp');
    expect(response.body.message).toEqual('OK');
    expect(response.body.uptime).toBeGreaterThan(0);
    expect(response.body.timestamp).toBeGreaterThan(0);
  });
});
