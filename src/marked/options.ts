import { postProcessor as postprocess } from './postprocessor';
import { MarkedExtension } from 'marked';

export const basicOptions: MarkedExtension = {
  async: false,
  breaks: true,
  hooks: {
    postprocess,
  },
};
