import { server } from '../index';
const request = require('supertest');
const serverConnection = server(4567);

describe('Stocks API', () => {
  it('GET /stocks --> array with all stocks', async () => {
    const response = await request(serverConnection).get('/stocks')

    expect(response.status).toBe(200)
    expect(response.body).toEqual(
      expect.arrayContaining([
      expect.objectContaining({
        _id: expect.any(String),
        symbol: expect.any(String),
        name: expect.any(String),
        __v: expect.any(Number),
      }),
    ]));
  });
});

describe('Stocks API filter', () => {
  it('GET /stocks/:filter --> array with all stocks that contain the filter in the company name', async () => {
    const response = await request(serverConnection).get('/stocks/apple')

    expect(response.status).toBe(200)
    expect(response.body).toEqual(
      expect.arrayContaining([
      expect.objectContaining({
        _id: expect.any(String),
        symbol: expect.stringMatching("AAPL"),
        name: expect.stringMatching("Apple Inc"),
        __v: expect.any(Number),
      }),
    ]));
  });

  it('GET /stocks/:filter --> array with all stocks that contain the filter in the company name', async () => {
    const response = await request(serverConnection).get('/stocks/tesla')

    expect(response.status).toBe(200)
    expect(response.body).toEqual(
      expect.arrayContaining([
      expect.objectContaining({
        _id: expect.any(String),
        symbol: expect.stringMatching("TSLA"),
        name: expect.stringMatching("Tesla Inc"),
        __v: expect.any(Number),
      }),
    ]));
  });
})


