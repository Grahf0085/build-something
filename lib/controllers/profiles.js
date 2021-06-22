import { Router } from 'express';
import Profile from '../models/Profile';

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
  });
