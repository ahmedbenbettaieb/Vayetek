import WebSocket from 'ws';
import { getGames, createGame, deleteGame, terminateGame } from '../database/dbActions.js';

export default function wsHandler(wss) {
  wss.on('connection', (ws) => {
    console.log('New client connected');

    ws.on('message', async (message) => {
      const { action, payload } = JSON.parse(message);

      try {
        let response;
        switch (action) {
          case 'fetchGames':
            const games = await getGames();
            response = { action: 'updateGames', payload: games };
            break;
          case 'createGame':
            const newGame = await createGame(payload.name);

            response = { action: 'newGame', payload: newGame };
            break;
          case 'deleteGame':
            await deleteGame(payload.id);
            
            response = { action: 'gameDeleted', payload: payload.id };
            break;
          case 'terminateGame':
            const terminatedGame = await terminateGame(payload.id);
            response = { action: 'gameTerminated', payload: terminatedGame };
            break;
          default:
            console.error(`Unknown action: ${action}`);
            return;
        }

        wss.clients.forEach((client) => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(response));
          }
        });
      } catch (err) {
        console.error(`Error handling message: ${err.message}`);
      }
    });

    ws.on('close', () => {
      console.log('Client disconnected');
    });
  });
}
