import { useEffect } from 'react';
import { useAppDispatch } from './reduxTypedHooks';
import { InitialState, loadData, parseMarkdown } from '../redux/markdownSlice';

type Data = Omit<InitialState, 'html'>;

const useLoadData = () => {
  const dispatch = useAppDispatch();
  const dataString = localStorage.getItem('data');
  if (!dataString) return;

  const data: Data = JSON.parse(dataString);

  useEffect(() => {
    dispatch(loadData(data));
    dispatch(parseMarkdown(data.markdown));
  }, []);
};

export default useLoadData;
