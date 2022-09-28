import { useForm } from 'react-hook-form';
import Page from '../components/Page';
import { io } from 'socket.io-client';
import { useNavigate } from 'react-router-dom';

const RoundResult = ({ socket, players, setPlayers, myPlayer, setMyPlayer, myGame, setMyGame, gameResults }) => {
  console.log("🚀 ~ file: RoundResult.jsx ~ line 7 ~ RoundResult ~ myPlayer", myPlayer)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = () => {
    socket.emit('next-question', myGame.id);
  };

  return (
    <Page className="flex items-center justify-center bg-green-400">
      {!myPlayer.isAdmin ? (
        <p>{JSON.stringify(gameResults)}</p>
      ) : (
        <form className="flex items-center justify-center gap-11" onSubmit={handleSubmit(onSubmit)}>
          <p>{JSON.stringify(gameResults)}</p>
          <button type="submit">Submit</button>
        </form>
      )}
    </Page>
  );
};

export default RoundResult;
