import Profile from '../models/Profile.js';

export default class ProfileService {
  static async getByIdWithQuote(id) {

    const profile = await Profile.findById(id);

    const quote = await getQuote(profile.accountId);

    return {
      ...profile,
      quote,
    };
  }
}
