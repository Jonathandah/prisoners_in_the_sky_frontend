import { useForm } from 'react-hook-form';
import Page from '../components/Page';
import { io } from 'socket.io-client';
import { useNavigate } from 'react-router-dom';

const Game = ({ socket, players, setPlayers, myPlayer, setMyPlayer, myGame, setMyGame, currentQuestion }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = ({ answer }) => {
    socket.emit('answer', myGame.id, answer);
  };

  const nextQ = ({ answer }) => {
    socket.emit('stop-round', myGame.id);
  };
  return (
    <Page className="flex items-center justify-center bg-green-400">
      {!myPlayer.isAdmin ? (
        <form className="flex items-center justify-center gap-11" onSubmit={handleSubmit(onSubmit)}>
          <p>{currentQuestion.question}</p>
          <label>Answer:</label>
          <input defaultValue="" {...register('answer', { required: true })} />

          <button type="submit">Submit</button>
        </form>
      ) : (
        <div className='flex flex-col'>
          <p>{currentQuestion.question}</p>
          <button className='border border-black' onClick={nextQ}>Finished</button>
        </div>
      )}
    </Page>
  );
};

export default Game;
