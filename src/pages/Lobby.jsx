import { useState } from 'react';
import { Link } from 'react-router-dom';
import Page from '../components/Page';

const Lobby = ({ socket, players, setPlayers, myPlayer, setMyPlayer, myGame, setMyGame }) => {
  const playerReady = () => {
    socket.emit('start-game', myGame.id);
  };

  return (
    <Page className="flex flex-col items-center justify-center bg-blue-400 gap-11">
      <section className="flex flex-col">
        {players
          .filter((p) => p.name !== 'admin')
          .map((player, i) => (
            <p key={i}>{player.name}</p>
          ))}
      </section>
      {myPlayer?.isAdmin && <button onClick={playerReady}>ready</button>}
    </Page>
  );
};

export default Lobby;
