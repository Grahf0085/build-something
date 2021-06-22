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

    // for (let i = 0; i < profile.length; i++) {
    //   profile[i].quote = quote;
    // }

    profile.forEach(item => item.quote = quote);

    return profile;

  }

  static async removeQuote(id) {

    const profile = await Profile.deleteQuote(id);

    delete profile.quote;

    return profile;
  }


  static async removeProfile(id) {

    const profile = await Profile.deleteProfile(id);

    return profile;
  }

  static async updateQuote(id) {

    const profile = await Profile.updateProfile(id);

    const quote = await getQuote();

    profile.quote = quote;

    return profile;
  }
}
