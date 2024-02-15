import markedFootnote from 'marked-footnote';
import markedLinkifyIt from 'marked-linkify-it';
import markedAlert from 'marked-alert';
import { MarkedExtension } from 'marked';

export const basicExtensions: MarkedExtension[] = [
  markedLinkifyIt({}, {}),
  markedFootnote({ refMarkers: true }),
];

export const gfmExtensions: MarkedExtension[] = [markedAlert()];
