import Profile from '../models/Profile.js';
import { getQuote } from '../utils/api.js';

export default class ProfileService {

  static async create({ email, accountId }) {
    const profile = await Profile.insert({ email, accountId });

    return profile;
  }
  
  static async getByIdWithQuote(id) {

    const profile = await Profile.findById(id);

    return profile;
  }

  static async getAllWithQuote() {
    const profile = await Profile.findAll();

    // for (let i = 0; i < profile.length; i++) {
    //   profile[i].quote = quote;
    // }

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
