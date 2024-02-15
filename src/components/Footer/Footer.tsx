import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import './footer.scss';

const Footer = () => {
  return (
    <div className='footer'>
      <p className='license'>
        This project is licensed under the{' '}
        <a
          href='https://www.gnu.org/licenses/gpl-3.0.en.html'
          target='_blank'
          rel='noopener noreferrer'
        >
          GNU General Public License 3.0{' '}
          <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
        </a>
      </p>
    </div>
  );
};

export default Footer;
