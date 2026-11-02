// Path: app/fonts.ts
import { Bricolage_Grotesque, Hanken_Grotesk } from 'next/font/google';

export const display = Bricolage_Grotesque({ subsets: ['latin'], weight: ['500', '800'], variable: '--ss-display', display: 'swap' });
export const body = Hanken_Grotesk({ subsets: ['latin'], weight: ['400', '500', '700'], variable: '--ss-body', display: 'swap' });