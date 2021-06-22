import { Router } from 'express';
import Profile from '../models/Profile';
import ProfileService from '../services/ProfileService';

export default Router()
  .post('/api/v1/profiles', (req, res, next) => {
  //   try {
  //     const profile = await Profile.insert(req.body);
  //     res.send(profile);
  //   }
  //   catch(err){
  //     next(err);
  //   }
    Profile.insert(req.body)
      .then((profile) => res.send(profile))
      .catch(next);
  })

  .get('/api/v1/profiles/:id', (req, res, next) => {
    ProfileService.getByIdWithQuote(req.params.id)
      .then((profile) => res.send(profile))
      .catch(next);
  })

  .get('/api/v1/profiles', (req, res, next) => {
    ProfileService.getAllWithQuote()
      .then((profile) => res.send(profile))
      .catch(next);
  })

  .delete('/api/v1/quotes/:id', (req, res, next) => {
    ProfileService.removeQuote(req.params.id)
      .then((profile) => res.send(profile))
      .catch(next);
  })

  .delete('/api/v1/profiles/:id', (req, res, next) => {
    ProfileService.removeProfile(req.params.id)
      .then((profile) => res.send(profile))
      .catch(next);
  });
