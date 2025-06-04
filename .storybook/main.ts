import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  "stories": [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-onboarding",
    "@chromatic-com/storybook",
    "@storybook/addon-docs",
    "@storybook/addon-a11y"
  ],
  "framework": {
    "name": "@storybook/react-vite",
    "options": {}
  },
  viteFinal: async (config) => {
    // 确保 Storybook 也能处理 Tailwind CSS
    const { mergeConfig } = await import('vite');
    return mergeConfig(config, {
      plugins: [
        // Tailwind CSS 插件会被 Vite 配置自动包含
      ],
    });
  },
};
export default config;