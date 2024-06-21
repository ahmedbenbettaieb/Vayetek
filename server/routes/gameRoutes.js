import express from 'express';
// import { getGames, createGame, deleteGame, terminateGame } from './db/games';
import { getGames, createGame, deleteGame, terminateGame } from '../database/dbActions.js';

const router = express.Router();

router.get('/games', async (req, res) => {
  try {
    const games = await getGames();
    res.json(games);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.post('/games', async (req, res) => {
  const { name } = req.body;
  try {
    const game = await createGame(name);
    res.json(game);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.delete('/games/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await deleteGame(id);
    res.sendStatus(204);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.put('/games/:id/terminate', async (req, res) => {
  const { id } = req.params;
  try {
    const game = await terminateGame(id);
    res.json(game);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

export default router;
