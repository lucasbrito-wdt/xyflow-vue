export { default as Background } from './Background.vue';
export const BackgroundVariant = {
  Lines: 'lines',
  Dots: 'dots',
  Cross: 'cross',
} as const;
export type BackgroundVariant = (typeof BackgroundVariant)[keyof typeof BackgroundVariant];
