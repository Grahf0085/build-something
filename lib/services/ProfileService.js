import Profile from '../models/Profile.js';
import { getQuote } from '../utils/api.js';

export default class ProfileService {
  
  static async getByIdWithQuote(id) {

    const profile = await Profile.findById(id);
    const quote = await getQuote();

    return {
      ...profile,
      quote,
    };
  }

  static async getAllWithQuote() {
    const profile = await Profile.findAll();
    const quote = await getQuote();

    for (let i = 0; i < profile.length; i++) {
      profile[i].quote = quote;
    }

    return profile;

  }

  static async remove(id) {

    const profile = await Profile.delete(id);

    delete profile.quote;

    return profile;
  }
}
