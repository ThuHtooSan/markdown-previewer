import { MarkedExtension } from 'marked';
import hljs from 'highlight.js';
import clipboardIcon from '../assets/clipboard.svg';
import emojis from '../../db/github-emojis.json';

// override built-in renderer to add more functionalities

// ================================
// renderer for CommonMark markdown
// ================================
export const basicRenderer: MarkedExtension['renderer'] = {
  // style codespan
  codespan(text) {
    return `<code class="inline-code">${text}</code>`;
  },

  // highlight codeblocks and add copy-to-clipboard icon
  code(code, lang, _) {
    const language = lang || 'plaintext';
    const highlightedCode = hljs.highlight(code, { language }).value;

    return `
      <div class="code-container">
        <pre><code class="block-code language-${lang}">${highlightedCode}</code></pre>
        <button class="copy-code" data-code="${btoa(code)}">
          <img src="${clipboardIcon}" class="icon" />
        </button>
      </div>
    `;
  },

  // open external links in new tabs
  link(href, title, text) {
    const titleAttr = title ? `title="${title}"` : '';

    return window.location.href === href
      ? `<a href="${href}" ${titleAttr} >${text}</a>`
      : `<a href="${href}" ${titleAttr} target="_blank">${text}</a>`;
  },
};

// ==================================
// Renderer for GFM Specific Markdown
// ==================================
export const gfmRenderer: MarkedExtension['renderer'] = {
  // render emojis
  text: text => {
    return text.replace(/:(\w+):/g, (_, emoji: string) => {
      const url = (emojis as { [key: string]: string })?.[emoji];
      return url
        ? `<img src="${url}" alt="${emoji} emoji" class="emoji ${emoji}" />`
        : `:${emoji}:`;
    });
  },

  // add link to headers
  heading(text, level, _) {
    return text.replace(
      /([^\{\}]+)(?:\{\s?\#(.+)\})?/g,
      (_, text, customId) => {
        const title = text.trim();

        if (level <= 2) {
          // remove all types of html tags
          const id =
            customId?.trim() || title.replace(/\<.*\>.*\<\/.*\>|\<.*\/\>/g, '');

          return `
          <a href="#${id}" title="#${id}" class="heading-link">
            <h${level} id="${id}">${title}</h${level}>
          </a>`;
        } else {
          return `<h${level}>${title}</h${level}>`;
        }
      }
    );
  },
};
