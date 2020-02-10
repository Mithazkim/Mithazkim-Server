import { app } from './../../src/index';
import request from 'supertest';

describe('GET /food', () => {
  it('should return 200 OK', () => {
    return request(app)
      .get('/api/food')
      .expect(200);
  }, 30000);
});

describe('GET /food', () => {
  it('should return 200 OK', () => {
    return request(app)
      .get('/api/food/123')
      .expect(500);
  }, 30000);
});
