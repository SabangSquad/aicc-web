import { metadata, RootLayout } from '@/app/layout';
import { Viewport } from 'next';
export { metadata };
export default RootLayout;

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  interactiveWidget: 'resizes-content', // 핵심!
};
