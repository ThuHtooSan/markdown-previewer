import DOMPurify from 'dompurify';

export const postProcessor = (dirtyHTML: string) => {
  return DOMPurify.sanitize(dirtyHTML, { ADD_ATTR: ['target'] });
};
