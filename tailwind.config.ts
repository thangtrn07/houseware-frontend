import type { Config } from 'tailwindcss';
import { nextui } from '@nextui-org/react';

const config: Config = {
   content: [
      './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
      './src/components/**/*.{js,ts,jsx,tsx,mdx}',
      './src/app/**/*.{js,ts,jsx,tsx,mdx}',
      './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
   ],
   theme: {
      extend: {
         fontFamily: {
            roboto: ['var(--font-roboto)', 'sans-serif']
         },
         // override screen
         screens: {
            sm: '540px', // => @media (min-width: 640px) { ... }
            md: '720px', // => @media (min-width: 768px) { ... }
            lg: '960px', // => @media (min-width: 1024px) { ... }
            xl: '1140px', // => @media (min-width: 1280px) { ... }
            '2xl': '1320px' // => @media (min-width: 1536px) { ... }
         },
         container: {
            center: true,
            padding: '1rem',
            screens: {
               default: '100%',
               sm: '100%',
               md: '100%',
               lg: '960px',
               xl: '1140px',
               '2xl': '1320px'
            }
         }
      }
   },
   darkMode: 'class',
   plugins: [nextui()]
};
export default config;
