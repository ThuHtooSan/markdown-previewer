import { useAppSelector } from '../../hooks/reduxTypedHooks';
import parseHTML from 'html-react-parser';
import './previewer.scss';
import { copyToClipboard } from '../../utils';

const Previewer = () => {
  const html = useAppSelector(state => state.markdown.html);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target;

    // code copy function for codeblocks
    if ((target as HTMLButtonElement).matches('button.copy-code')) {
      copyToClipboard(atob((target as HTMLButtonElement).dataset.code || ''));
    }
  };

  return (
    <>
      <div
        className='preview-container'
        id='preview'
        onClick={handleClick}
      >
        {parseHTML(html)}
      </div>
    </>
  );
};

export default Previewer;
