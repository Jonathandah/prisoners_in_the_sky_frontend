import { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';
import { SocketProvider } from './hooks/useSocket';
import Game from './pages/Game';
import Home from './pages/Home';
import Host from './pages/Host';
import Join from './pages/Join';
import Lobby from './pages/Lobby';
import RoundResult from './pages/RoundResult';

const socket = io('http://localhost:3000');

function App() {
  const navigate = useNavigate();
  const [players, setPlayers] = useState([]);
  const [myPlayer, setMyPlayer] = useState(null);
  const [myGame, setMyGame] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [gameResults, setGameResults] = useState({});
  const [screen, setScreen] = useState('LOBBY');

  useEffect(() => {
    socket.on('connect', () => {
      console.log('We got a signal!');
    });

    socket.on('player-joined', (player) => {
      console.log('player joined', player);
      setPlayers([...players, player]);
    });

    socket.on('player-left', (playerId) => {
      console.log('got playerLeft');
      setPlayers(players.filter((player) => player.id !== playerId));
    });

    socket.on('start-round', (question) => {
      console.log('🚀 ~ file: App.js ~ line 39 ~ socket.on ~ question', question);
      //later determine by type what question componneet to use
      setCurrentQuestion(question);
      setScreen('GAME');
    });

    socket.on('end-round', (data) => {
      //fix code duplication later
      console.log("🚀 ~ file: App.js ~ line 58 ~ socket.on ~ end-round", "end-round")
      const result = { ...data };
      result.lastRound.answers = new Map(result.lastRound.answers); //convert back to map
      result.score = new Map(result.score); //convert back to map
      result.placement = new Map(result.placement); //convert back to map
      // roundResults = { ...results };
      // roundResults.answers = new Map(roundResults.answers);
      setGameResults(result);
      setScreen('ROUND_RESULT');
      // navigate('/round-result');
    });


    socket.on('end-game', (data) => {
      const result = { ...data };
      result.lastRound.answers = new Map(result.lastRound.answers); //convert back to map
      result.score = new Map(result.score); //convert back to map
      result.placement = new Map(result.placement); //convert back to map

      setGameResults(result);
      // setScreen("END_RESULT")
      // $activeComponent = 'GameResult';
      console.log('game results', result);
    });

    socket.on('global-chat', (m) => {
      console.log('got global chat', m);
    });

    return () => {
      socket.off('connect');
      socket.off('layer-joined');
      socket.off('player-left');
      socket.off('start-round');
      socket.off('end-round');
      socket.off('end-game');
      socket.off('global-chat');
    };
  }, []);

  //when player in disconnects

  const currentGameScreen = {
    LOBBY: Lobby,
    GAME: Game,
    ROUND_RESULT: RoundResult,
  };
  const Component = currentGameScreen[screen];
  return (
    // <SocketProvider>
    <div className="flex flex-col w-screen h-screen">
      <header className="flex items-center justify-center w-screen h-12">
        <h1>IN THE SKY</h1>
      </header>
      <main className="flex-1 w-screen">
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route
            path="/join"
            element={
              <Join
                socket={socket}
                players={players}
                setPlayers={setPlayers}
                myPlayer={myPlayer}
                setMyPlayer={setMyPlayer}
                myGame={myGame}
                setMyGame={setMyGame}
              />
            }
          ></Route>
          <Route
            path="/host"
            element={
              <Host
                socket={socket}
                players={players}
                setPlayers={setPlayers}
                myPlayer={myPlayer}
                setMyPlayer={setMyPlayer}
                myGame={myGame}
                setMyGame={setMyGame}
              />
            }
          ></Route>
          <Route
            path="/game"
            element={
              <Component
                gameResults={gameResults}
                socket={socket}
                players={players}
                setPlayers={setPlayers}
                myPlayer={myPlayer}
                setMyPlayer={setMyPlayer}
                myGame={myGame}
                setMyGame={setMyGame}
                currentQuestion={currentQuestion}
              />
            }
          />
          {/* <Route
            path="/lobby"
            element={
              <Lobby
                socket={socket}
                players={players}
                setPlayers={setPlayers}
                myPlayer={myPlayer}
                setMyPlayer={setMyPlayer}
                myGame={myGame}
                setMyGame={setMyGame}
              />
            }
          ></Route>
          <Route
            path="/game"
            element={
              <Game
                socket={socket}
                players={players}
                setPlayers={setPlayers}
                myPlayer={myPlayer}
                setMyPlayer={setMyPlayer}
                myGame={myGame}
                setMyGame={setMyGame}
                currentQuestion={currentQuestion}
              />
            }
          ></Route>
          <Route
            path="/round-result"
            element={
              <RoundResult
                socket={socket}
                players={players}
                setPlayers={setPlayers}
                myPlayer={myPlayer}
                setMyPlayer={setMyPlayer}
                myGame={myGame}
                setMyGame={setMyGame}
                currentQuestion={currentQuestion}
              />
            }
          ></Route> */}
        </Routes>
      </main>
    </div>
    // </SocketProvider>
  );
}

export default App;
