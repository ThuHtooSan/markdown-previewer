import './sass/base.scss';
import Home from './pages/Home';
import 'highlight.js/styles/github.css';
import { About, Footer, Header } from './components';
import { useLoadData, useSaveData } from './hooks';

function App() {
  useLoadData();
  useSaveData();

  return (
    <>
      <Header />
      <Home />
      <Footer />
      <About />
    </>
  );
}

export default App;
