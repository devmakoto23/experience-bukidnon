import { appWithTranslation } from 'next-i18next'
import { AppProps } from 'next/app'
import '../app/globals.css';
import LanguageSwitcher from '@/components/language-switcher';

const MyApp = ({ Component, pageProps }: AppProps) => (
  <div>
    <LanguageSwitcher></LanguageSwitcher>
    <Component {...pageProps} />
  </div>
  
)

export default appWithTranslation(MyApp)