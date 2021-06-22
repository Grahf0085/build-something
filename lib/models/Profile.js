import pool from '../utils/pool.js';

export default class Profile {
  id;
  email;
  accountId;

  constructor(row) {
    this.id = row.id;
    this.email = row.email;
    this.accountId = row.account_id;
  }

  static async insert({ email, accountId }) {
    const { rows } = await pool.query(`
    INSERT INTO profiles 
    (email, account_id)
    VALUES ($1, $2) 
    RETURNING *
    `, [email, accountId]);

    return new Profile(rows[0]);

  }
}
