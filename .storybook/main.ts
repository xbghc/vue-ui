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
  staticDirs: ['../public'],
  docs: {
    autodocs: 'tag',
  },
  typescript: {
    check: false,
  },
  viteFinal: config => {
    // 配置GitHub Pages的基础路径
    if (process.env.NODE_ENV === 'production') {
      config.base = '/vue-ui/';
    }
    
    // Ensure Vite can handle .vue files
    return config;
  },
};

export default config;
