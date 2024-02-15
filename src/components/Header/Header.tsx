import './header.scss';
import fccLogo from '../../assets/freeCodeCamp.svg';
import markdownLogo from '../../assets/markdown-mark.svg';

const Header = () => {
  return (
    <div className='header'>
      <h4 className='sub-title'>
        A
        <img
          src={fccLogo}
          alt='freeCodeCamp Logo'
          className='fcc-logo'
          title='freeCodeCamp'
        />
        Project
      </h4>
      <h2 className='title'>
        <img
          src={markdownLogo}
          alt='Markdown Mark Logo'
          className='markdown-logo'
          title='Markdown Mark'
        />{' '}
        Markdown Previewer
      </h2>
    </div>
  );
};

export default Header;
