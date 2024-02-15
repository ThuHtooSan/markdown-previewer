import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Marked, MarkedExtension } from 'marked';
import { baseUrl } from 'marked-base-url';
import {
  basicOptions,
  basicRenderer,
  basicExtensions,
  gfmRenderer,
  gfmExtensions,
} from '../marked';
import { getSelectedFlavor } from '../utils';

export type InitialState = {
  flavors: Flavor[];
  baseUrl: string;
  markdown: string;
  html: string;
};

export type Flavor = {
  name: 'Common Mark' | 'GitHub Flavored Markdown';
  id: 'common-mark' | 'gfm';
  selected: boolean;
};

const flavors: Flavor[] = [
  {
    name: 'Common Mark',
    id: 'common-mark',
    selected: false,
  },
  {
    name: 'GitHub Flavored Markdown',
    id: 'gfm',
    selected: true,
  },
];

const initialState: InitialState = {
  flavors,
  baseUrl: '',
  markdown: '',
  html: '',
};

const markdownSlice = createSlice({
  name: 'markdown',
  initialState,
  reducers: {
    parseMarkdown: (state, action: PayloadAction<string>) => {
      const flavorId = getSelectedFlavor(state.flavors).id;
      const renderer: MarkedExtension['renderer'] =
        flavorId === 'gfm'
          ? {
              ...basicRenderer,
              ...gfmRenderer,
            }
          : basicRenderer;

      const options: MarkedExtension = {
        ...basicOptions,
        gfm: flavorId === 'gfm',
        renderer,
      };
      const extensions =
        flavorId === 'gfm'
          ? [...basicExtensions, ...gfmExtensions]
          : basicExtensions;

      const marked = new Marked(options, ...extensions);

      // set base url
      marked.use(baseUrl(state.baseUrl));

      state.markdown = action.payload;
      state.html = marked.parse(action.payload) as string;
    },

    setFlavor: (state, action: PayloadAction<Flavor['id']>) => {
      state.flavors = state.flavors.map(flavor => {
        flavor.selected = flavor.id === action.payload;

        return flavor;
      });
    },

    setBaseUrl: (state, action: PayloadAction<string>) => {
      state.baseUrl = action.payload;
    },

    loadData: (state, action: PayloadAction<Omit<InitialState, 'html'>>) => {
      const { markdown, flavors, baseUrl } = action.payload;
      state.markdown = markdown;
      state.flavors = flavors;
      state.baseUrl = baseUrl;
    },
  },
});

export default markdownSlice.reducer;
export const { parseMarkdown, setFlavor, setBaseUrl, loadData } =
  markdownSlice.actions;
