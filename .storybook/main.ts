import type { StorybookConfig } from '@storybook/vue3-vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|mjs|ts|tsx)', '../src/**/*.mdx'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/vue3-vite',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  typescript: {
    check: false,
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: prop => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true),
    },
  },
  viteFinal: config => {
    // Ensure Vite can handle .vue files
    return config;
  },
};

export default config;
