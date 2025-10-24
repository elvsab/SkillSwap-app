import type { StorybookConfig } from '@storybook/react-vite';
import svgr from 'vite-plugin-svgr';

const config: StorybookConfig = {
  "stories": [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [
    "@chromatic-com/storybook",
    "@storybook/addon-docs",
    "@storybook/addon-a11y",
    "@storybook/addon-vitest"
  ],
  async viteFinal(config) {
    // добавляем плагин svgr
    config.plugins = config.plugins || [];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    config.plugins.push(svgr({ exportAsDefault: false } as any)); // опции по вкусу
    return config;
  },
  "framework": {
    "name": "@storybook/react-vite",
    "options": {}
  }
};
export default config;