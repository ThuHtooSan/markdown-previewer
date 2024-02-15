import { useAppDispatch, useAppSelector } from '../../hooks/reduxTypedHooks';
import { parseMarkdown } from '../../redux/markdownSlice';
import './editor.scss';
import { Options } from '..';

const Editor = () => {
  const markdown = useAppSelector(state => state.markdown.markdown);
  const dispatch = useAppDispatch();

  return (
    <div className='editor-container'>
      <Options />
      <textarea
        className='editor'
        value={markdown}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
          dispatch(parseMarkdown(e.target.value))
        }
        id='editor'
      />
    </div>
  );
};

export default Editor;
