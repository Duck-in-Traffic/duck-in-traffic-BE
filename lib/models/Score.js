const pool = require('../../sql/pool');

module.exports = class Score {
  id;
  user_id;
  score;

  constructor(row) {
    this.id = row.id;
    this.user_id = row.user_id;
    this.score = row.score;
  }

  static async insert({ user_id, score }) {
    const { rows } = await pool.query(
      `
      INSERT INTO scores (user_id, score)
      VALUES ($1, $2)
      RETURNING *;
    `,
      [user_id, score]
    );

    return new Score(rows[0]);
  }

  static async getAll() {
    const { rows } = await pool.query(
      `
      SELECT id, user_id, score
      FROM   scores
    `,
      []
    );
    return rows.map((row) => new Score(row));
  }

  static async getById(id) {
    const { rows } = await pool.query(
      `
      SELECT id, user_id, score
      FROM   scores
      WHERE  id = $1;
    `,
      [id]
    );

    return rows.length ? new Score(rows[0]) : null;
  }

  static async update(id, score) {
    const { rowCount } = await pool.query(
      `
UPDATE scores SET user_id = $2, score = $3, WHERE id = $1;
`,
      [id, score.user_id, score.score]
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
