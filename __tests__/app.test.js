import dotenv from 'dotenv';
import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import Profile from '../lib/models/Profile.js';
dotenv.config();

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

  it('get a profile and quote by id', async () => {

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

  it('gets all profiles', async () => {

    const oneProfile = await Profile.insert({
      email: 'bleh@tutanota.com',
      accountId: 'grahf1',
    });    

    const twoProfile = await Profile.insert({
      email: 'blah@tutanota.com',
      accountId: 'grahf2',
    });

    const threeProfile = await Profile.insert({
      email: 'blek@tutanota.com',
      accountId: 'grahf3',
    });

    const res = await request(app).get('/api/v1/profiles');

    expect(res.body).toEqual([{ ...oneProfile, quote: expect.any(String) }, { ...twoProfile, quote: expect.any(String) }, { ...threeProfile, quote: expect.any(String) }
    ]);

  });

  it('removes quote from a profile', async () => {

    const badQuote = await Profile.insert({
      email: 'abcd@tutanota.com',
      accountId: '1234',
      quote: 'dkjgdgiudsfdsnfndsflhdsdskfbnodsnf'
    });

    const res = await request(app)
      .delete(`/api/v1/quotes/${badQuote.id}`);

    expect(res.body).toEqual({
      id: '1',
      email: 'abcd@tutanota.com',
      accountId: '1234',
    });

  });

  it('deletes a profile', async () => {

    const badProfile = await Profile.insert({
      email: 'abcd@tutanota.com',
      accountId: '1234',
    });

    const res = await request(app)
      .delete(`/api/v1/profiles/${badProfile.id}`);

    expect(res.body).toEqual(badProfile);
  });

  it('updates a quote', async () => {

    const oldProfile = await Profile.insert({
      email: '1234@tutanota.com',
      accountId: '0000',
      quote: 'This lab is amazin',
    });

    const res = await request(app)
      .put(`/api/v1/profiles/${oldProfile.id}`);

    expect(res.body).toEqual({
      id: '1',
      email: '1234@tutanota.com',
      accountId: '0000',
      quote: expect.not.stringContaining('This lab is amazin')
    });

  });

});

