import pool from "./database.js";

const getGames = async () => {
  try {
    const result = await pool.query('SELECT * FROM games');
    return result.rows;
  } catch (err) {
    throw new Error(`Error getting games: ${err.message}`);
  }
};

const createGame = async (name) => {
  try {
    const result = await pool.query('INSERT INTO games (name, status) VALUES ($1, $2) RETURNING *', [name, 'active']);
    return result.rows[0];
  } catch (err) {
    throw new Error(`Error creating game: ${err.message}`);
  }
};

const deleteGame = async (id) => {
  try {
    await pool.query('DELETE FROM games WHERE id = $1', [id]);
  } catch (err) {
    throw new Error(`Error deleting game: ${err.message}`);
  }
};

const terminateGame = async (id) => {
  try {
    const result = await pool.query('UPDATE games SET status = $1 WHERE id = $2 RETURNING *', ['terminated', id]);
    return result.rows[0];
  } catch (err) {
    throw new Error(`Error terminating game: ${err.message}`);
  }
};

export { getGames, createGame, deleteGame, terminateGame };
