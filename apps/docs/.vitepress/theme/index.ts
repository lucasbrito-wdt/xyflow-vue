import { h } from 'vue';
import DefaultTheme from 'vitepress/theme';
import ExampleFrame from './ExampleFrame.vue';
import './custom.css';

export default {
  extends: DefaultTheme,
  Layout: () => h(DefaultTheme.Layout, null, {}),
  enhanceApp({ app }) {
    app.component('ExampleFrame', ExampleFrame);
  },
};
