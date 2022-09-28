import { Link } from 'react-router-dom';
import Page from '../components/Page';

const Home = () => {
  return (
    <Page className="flex flex-col items-center justify-center bg-blue-400 gap-11">
      <Link to="/join">Join</Link>
      <Link to="/host">Host</Link>
    </Page>
  );
};

export default Home;
