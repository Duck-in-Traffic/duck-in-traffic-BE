const pool = require('../../sql/pool');

module.exports = class Score {
  id;
  user_id;
  coins;
  skins;

  constructor(row) {
    this.id = row.id;
    this.user_id = row.user_id;
    this.coins = row.coins;
    this.skins = row.skins;
  }

  static async insert({ user_id, coins, skins }) {
    const { rows } = await pool.query(
      `
      INSERT INTO scores (user_id, coins, skins)
      VALUES ($1, $2, $3)
      RETURNING *;
    `,
      [user_id, coins, skins]
    );

    return new Score(rows[0]);
  }

  static async getAll() {
    const { rows } = await pool.query(
      `
      SELECT id, user_id, coins, skins
      FROM   scores
    `,
      []
    );
    return rows.map((row) => new Score(row));
  }

  static async getById(id) {
    const { rows } = await pool.query(
      `
      SELECT id, user_id, coins, skins
      FROM   scores
      WHERE  id = $1;
    `,
      [id]
    );

    return rows.length ? new Score(rows[0]) : null;
  }

  static async update(id, inventory) {
    const { rowCount } = await pool.query(
      `
UPDATE scores SET user_id = $2, coins = $3, skins = $4, WHERE id = $1;
`,
      [id, inventory.user_id, inventory.coins, inventory.skins]
    );
    return rowCount;
  }

  static async del(id) {
    const { rowCount } = await pool.query(
      `
       DELETE from scores WHERE id = $1;
`,
      [id]
    );
    return rowCount;
  }
};
