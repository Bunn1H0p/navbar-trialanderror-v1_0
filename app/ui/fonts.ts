import { Inter } from 'next/font/google';
import { M_PLUS_Rounded_1c } from 'next/font/google';

export const inter = Inter({ subsets: ['latin'] });

export const mPlusRounded = M_PLUS_Rounded_1c({
  subsets: ['latin'],
  weight: ['400', '500', '700'], // Pick weights you want
  display: 'swap',
});