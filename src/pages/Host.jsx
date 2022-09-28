import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import Page from '../components/Page';

const Host = ({ socket, players, setPlayers, myPlayer, setMyPlayer, myGame, setMyGame }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = (formData) => {
    // let data = { name: 'test' };
    socket.emit('create-game', {}, (response) => {
      const { status, isAdmin, playerId, gameData, players } = response;

      if (status === 'ok') {
        setMyGame(gameData);
        setPlayers(players);
        setMyPlayer((state) => ({ ...state, isAdmin, playerId, name: 'admin' }));
        localStorage.setItem('skyGame', { gameData, players, myPlayer });
        navigate('/game');
      }
    });
  };

  return (
    <Page className="flex items-center justify-center bg-yellow-400">
      <form className="flex items-center justify-center gap-11" onSubmit={handleSubmit(onSubmit)}>
        <input defaultValue="test" {...register('example')} />
        {errors.exampleRequired && <span>This field is required</span>}
        <button type="submit">Create</button>
      </form>
    </Page>
  );
};

export default Host;
