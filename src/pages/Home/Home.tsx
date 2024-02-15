import { Editor, Previewer } from '../../components';
import './home.scss';

const Home = () => {
  return (
    <div className='home'>
      <div className='main-container'>
        <Editor />
        <Previewer />
      </div>
    </div>
  );
};

export default Home;
