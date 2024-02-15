import './options.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faDownload,
  faCopy,
  faUpload,
  faEllipsis,
} from '@fortawesome/free-solid-svg-icons';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxTypedHooks';
import { Flavor, parseMarkdown, setFlavor } from '../../redux/markdownSlice';
import { copyToClipboard } from '../../utils';
import fileDownload from 'js-file-download';
import { useRef, useState } from 'react';
import { AdvancedOptions } from '..';

const Options = () => {
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);
  const { markdown, flavors } = useAppSelector(state => state.markdown);
  const dispatch = useAppDispatch();
  const filePickerRef = useRef<HTMLInputElement>(null!);
  const selectedFlavor = flavors.filter(flavor => flavor.selected)[0];

  const handleSelection = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setFlavor(e.target.value as Flavor['id']));
    dispatch(parseMarkdown(markdown));
  };

  const handleCopy = () => copyToClipboard(markdown);

  const handleDownload = () => fileDownload(markdown, 'README.md');

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];

    if (!file.type.startsWith('text/')) {
      console.error('Invalid file type', file);
      return;
    }

    const fileReader = new FileReader();
    fileReader.addEventListener('load', (e: Event) => {
      dispatch(
        parseMarkdown(((e.target as FileReader).result as string) || '')
      );
    });
    fileReader.readAsText(file);
  };

  return (
    <>
      <div className='option-container'>
        <select
          name='flavor'
          className='flavor'
          value={selectedFlavor.id}
          onChange={handleSelection}
        >
          <option
            value=''
            disabled
          >
            ==== Markdown Flavor ====
          </option>
          {flavors.map(flavor => (
            <option
              value={flavor.id}
              key={flavor.id}
            >
              {flavor.name}
            </option>
          ))}
        </select>
        <div className='options'>
          <button
            className='option copy'
            title='Copy markdown'
            onClick={handleCopy}
          >
            <FontAwesomeIcon icon={faCopy} />{' '}
          </button>
          <button
            className='option download'
            title='Download this markdown'
            onClick={handleDownload}
          >
            <FontAwesomeIcon icon={faDownload} />{' '}
          </button>

          <button
            className='option upload'
            title='Upload markdown file'
            onClick={() => filePickerRef.current.click()}
          >
            <FontAwesomeIcon icon={faUpload} />{' '}
          </button>

          <button
            className='option more'
            title='More options'
            onClick={() => setShowAdvancedOptions(true)}
          >
            <FontAwesomeIcon icon={faEllipsis} />{' '}
          </button>
        </div>
      </div>
      {/* ugly file upload button */}
      <input
        type='file'
        name='file'
        style={{ display: 'none' }}
        accept='.md, .txt'
        ref={filePickerRef}
        onChange={handleUpload}
      />

      <AdvancedOptions
        show={showAdvancedOptions}
        setShow={setShowAdvancedOptions}
      />
    </>
  );
};

export default Options;
