import type { Preview } from '@storybook/vue3';
import '../src/styles/index.scss';
import './custom.css';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      toc: {
        contentsSelector: '.sbdocs-content',
        headingSelector: 'h1, h2, h3',
        ignoreSelector: '#primary',
        title: '目录',
        disable: false,
        unsafeTocbotOptions: {
          orderedList: false,
        },
      },
    },
    options: {
      storySort: {
        order: [
          'Guide',
          ['Installation', 'Getting Started', 'Import Methods', 'Changelog'],
          'Components', 
          ['ToolTip'], 
          'Development',
          ['Setup', 'Code Standards', 'Contributing', 'Storybook Guide'],
          '*'
        ],
      },
    },
  },
};

export default preview;
