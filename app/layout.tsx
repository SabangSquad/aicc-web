import { metadata, RootLayout } from '@/app/layout';
import { Viewport } from 'next';
export { metadata };
export default RootLayout;

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  interactiveWidget: 'resizes-content',
};
