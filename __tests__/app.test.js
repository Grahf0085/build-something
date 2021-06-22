import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import Profile from '../lib/models/Profile.js';

describe('iDunno routes', () => {
  
  beforeEach(() => {
    return setup(pool);
  });

  it('creates a profile via POST', async () => {
    const res = await request(app)
      .post('/api/v1/profiles')
      .send({
        email: 'tuckerhoog@tutanota.com',
        accountId: 'grahf'
      });
      
    expect(res.body).toEqual({
      id: '1',
      email: 'tuckerhoog@tutanota.com',
      accountId: 'grahf'
    });
  });

  it('get a profile and qoote by id', async () => {

    await Profile.insert({
      email: 'tuckerhoog@tutanota.com',
      accountId: 'grahf',
    });

    const res = await request(app).get('/api/v1/profiles/1');

    expect(res.body).toEqual({
      id: '1',
      email: 'tuckerhoog@tutanota.com',
      accountId: 'grahf',
      quote: expect.any(String),
    });
  });
});
