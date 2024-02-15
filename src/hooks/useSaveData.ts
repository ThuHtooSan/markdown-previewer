import { useEffect } from 'react';
import { useAppSelector } from './reduxTypedHooks';

const useSaveData = () => {
  const { markdown, flavors, baseUrl } = useAppSelector(
    state => state.markdown
  );

  useEffect(() => {
    const data = { markdown, flavors, baseUrl };
    localStorage.setItem('data', JSON.stringify(data));
  }, [markdown, flavors, baseUrl]);
};

export default useSaveData;
