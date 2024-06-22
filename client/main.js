const ws = new WebSocket('ws://localhost:3000');

ws.onopen = () => {
  console.log('Connected to WebSocket server');
  ws.send(JSON.stringify({ action: 'fetchGames' })); 

};

ws.onerror = (error) => {
  console.error('WebSocket Error:', error);
};

document.getElementById('create-game').addEventListener('click', () => {
  const name = document.getElementById('game-name').value;
  if (name) {
    ws.send(JSON.stringify({ action: 'createGame', payload: { name } }));
    ws.send(JSON.stringify({ action: 'fetchGames' })); 

  }
});
//we will do the same but we with the delete button
// document.getElementById('delete-game').addEventListener('click', () => {
    
// })



ws.onmessage = (event) => {
  const { action, payload } = JSON.parse(event.data);
  if (action === 'updateGames') {
    updateGameLists(payload);

  } else if (action === 'deleteGame') {
    removeGame(payload);

  }
};

function updateGameLists(games) {
  const activeGames = document.getElementById('active-games');
  const terminatedGames = document.getElementById('terminated-games');
  activeGames.innerHTML = '';
  terminatedGames.innerHTML = '';

  games.forEach(game => {
    const li = document.createElement('li');
    li.textContent = game.name;
    li.dataset.id = game.id; // Ensure each list item has the game id for easy removal

    if (game.status === 'active') {
      const terminateButton = document.createElement('button');
      terminateButton.textContent = 'Terminate';
      terminateButton.addEventListener('click', () => {
        ws.send(JSON.stringify({ action: 'terminateGame', payload: { id: game.id } }));
            ws.send(JSON.stringify({ action: 'fetchGames' })); 

      });

      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.addEventListener('click', () => {
        ws.send(JSON.stringify({ action: 'deleteGame', payload: { id: game.id } }));

      });

      li.appendChild(terminateButton);
      li.appendChild(deleteButton);
      activeGames.appendChild(li);
    } else {
      terminatedGames.appendChild(li);
    }
  });
}

function removeGame(gameId) {
  const gameElement = document.querySelector(`li[data-id="${gameId}"]`);
  if (gameElement) {
    gameElement.remove();

  }
}
