import { useForm } from 'react-hook-form';
import Page from '../components/Page';
import { io } from 'socket.io-client';
import { useNavigate } from 'react-router-dom';

const Join = ({ socket, players, setPlayers, myPlayer, setMyPlayer, myGame, setMyGame }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = ({ name }) => {
    socket.emit('join-game', { name }, (response) => {
      const { status, playerId, gameData, players } = response;
      if (status === 'ok') {
        setMyGame(gameData);
        setPlayers(players);
        setMyPlayer((state) => ({ ...state, isAdmin: false, name, playerId }));
        localStorage.setItem('skyGame', { gameData, players, myPlayer });
        navigate('/game');
      }
    });
  };

  return (
    <Page className="flex items-center justify-center bg-green-400">
      <form className="flex items-center justify-center gap-11" onSubmit={handleSubmit(onSubmit)}>
        <label>Name:</label>
        <input defaultValue="" {...register('name', { required: true })} />
        {/* {errors.exampleRequired && <span>This field is required</span>} */}
        <button type="submit">Join</button>
      </form>
    </Page>
  );
};

export default Join;
