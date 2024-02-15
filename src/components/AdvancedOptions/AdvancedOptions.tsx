import './advanced-options.scss';
import { AnimatePresence, motion } from 'framer-motion';
import {
  advancedOptionsContainerVariants,
  advancedOptionsVariants,
} from './AdvancedOptions.variants';
import { AdvancedOptionsProps } from './AdvanedOptions.types';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxTypedHooks';
import { parseMarkdown, setBaseUrl } from '../../redux/markdownSlice';

const AdvancedOptions = ({ show, setShow }: AdvancedOptionsProps) => {
  const { baseUrl, markdown } = useAppSelector(state => state.markdown);
  const dispatch = useAppDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setBaseUrl(e.target.value));
    dispatch(parseMarkdown(markdown));
  };

  const handleSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key == 'Enter') {
      e.currentTarget.blur();
    }
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className='advanced-options-container'
          initial='hidden'
          animate='visible'
          exit='hidden'
          variants={advancedOptionsContainerVariants}
          onClick={() => setShow(false)}
        >
          <motion.div
            className='advanced-options'
            variants={advancedOptionsVariants}
            onClick={(e: React.MouseEvent) => e.stopPropagation()}
          >
            <h4 className='title'>Advanced Options</h4>
            <div className='option baseUrl'>
              <div className='option-name'>
                <span className='option-title'>Base URL</span>
                <span className='option-description'>for relative links</span>
              </div>
              <input
                type='url'
                name='baseUrl'
                value={baseUrl}
                className='baseUrl-input'
                placeholder='(Unspecified)'
                onChange={handleChange}
                onKeyDown={handleSubmit}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AdvancedOptions;
