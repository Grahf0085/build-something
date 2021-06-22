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
}
