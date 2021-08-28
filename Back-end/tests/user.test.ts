import { server } from '../index';
const request = require('supertest');
const serverConnection = server(9089);
import User from '../models/userModel';

describe('Stocks API create user', () => {
  it('POST /users --> should create a user, verify the status and delete it from db', async () => {
    const newUser = {
      "userName": "test", 
      "password": "test123", 
      "confirmPassword": "test123"
    }
    const response = await request(serverConnection).post('/users').send(newUser)
    expect(response.status).toBe(201)
    expect(response.body).toEqual(
      expect.objectContaining({
        userName: expect.stringMatching("test"),
        token: expect.any(String)
      })
    );
    await User.findOne({userName: "test"}).then((doc: any) => doc.remove()).catch((error: Error) => console.log(error));
  });

  it('POST /users --> should not create a user because it already exists', async () => {
    const newUser = {
      "userName": "bianca", 
      "password": "test123", 
      "confirmPassword": "test123"
    }
    const response = await request(serverConnection).post('/users').send(newUser)
    expect(response.status).toBe(400)
    expect(response.body).toEqual(
      expect.objectContaining({
        message: expect.stringMatching('Username taken, choose another one.'),
      })
    );
  });

  it('POST /users --> should not create a user if passwords do not match', async () => {
    const newUser = {
      "userName": "test", 
      "password": "test123", 
      "confirmPassword": "test1234"
    }
    const response = await request(serverConnection).post('/users').send(newUser)
    expect(response.status).toBe(400)
    expect(response.body).toEqual(
      expect.objectContaining({
        message: expect.stringMatching(`Passwords don't match.`),
      })
    );
  });
})

describe('Users data', () => {
  it('GET /users/ranking --> array with all users info sorted', async () => {
    const response = await request(serverConnection).get('/users/ranking')

    expect(response.status).toBe(200)
    expect(response.body).toEqual(
      expect.arrayContaining([
      expect.objectContaining({
        totalNumberOfActivities: expect.any(Number),
        numberOfStocks: expect.any(Number),
        _id: expect.any(String),
        userName: expect.any(String),
        totalValue: expect.any(Number),
        __v: expect.any(Number),
      }),
    ]));
  });
  
  it('GET /users --> array with all users', async () => {
    const response = await request(serverConnection).get('/users')

    expect(response.status).toBe(200)
    expect(response.body).toEqual(
      expect.arrayContaining([
      expect.objectContaining({
        _id: expect.any(String),
        cash: expect.any(Number),
        holdings: expect.arrayContaining([
          expect.objectContaining({
            company: expect.any(String),
            ticker: expect.any(String),
            quantity: expect.any(Number),
            avgCost: expect.any(Number),
          })
        ]),
        activities: expect.arrayContaining([
          expect.objectContaining({
            date: expect.any(String),
            company: expect.any(String),
            ticker: expect.any(String),
            action: expect.any(String),
            quantity: expect.any(Number),
            price: expect.any(Number),
            netAmount: expect.any(Number)
          })
        ]),
        totalValueHistory: expect.arrayContaining([
          expect.objectContaining({
            totalValue: expect.any(Number),
            date: expect.any(String)
          })
        ])
        ,
        userName: expect.any(String),
        password: expect.any(String),
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
        __v: expect.any(Number),
      }),
    ]));
  });
});