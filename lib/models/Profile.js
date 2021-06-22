import pool from '../utils/pool.js';
import { getQuote } from '../utils/api.js';

export default class Profile {
  id;
  email;
  accountId;
  quote;

  constructor(row) {
    this.id = row.id;
    this.email = row.email;
    this.accountId = row.account_id;
    this.quote = row.quote;
  }

  static async insert({ email, accountId }) {

    const quote = getQuote();

    const { rows } = await pool.query(`
    INSERT INTO profiles 
    (email, account_id, quote)
    VALUES ($1, $2, $3) 
    RETURNING *
    `, [email, accountId, quote]);

    return new Profile(rows[0]);

  }

  static async findById(id) {
    const { rows } = await pool.query('SELECT * FROM profiles WHERE id = $1', 
      [id]);

    if (!rows[0]) return null;
    return new Profile(rows[0]);
  }

  static async findAll() {
    const { rows } = await pool.query(`
    SELECT * FROM profiles
    `);

    return rows.map(row => new Profile(row));
  }

  static async deleteQuote(id) {
    const { rows } = await pool.query(`
    SELECT * FROM profiles WHERE id = $1
    `, [id]);

    return new Profile(rows[0]);
  }

  static async deleteProfile(id) {
    const { rows } = await pool.query(`
    DELETE FROM profiles WHERE id = $1 RETURNING *
    `, [id]);

    return new Profile(rows[0]);
  }

  static async updateProfile(id) {
    const { rows } = await pool.query(`
    SELECT * FROM profiles WHERE id = $1
    `, [id]);

    return new Profile(rows[0]);
  }
}
