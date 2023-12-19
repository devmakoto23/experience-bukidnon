// components/LanguageSwitcher.js

import React from 'react';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';


function LanguageSwitcher() {
  const { t } = useTranslation();
  const router = useRouter();

  const changeLanguage = (language: string) => {
    const currentPath = router.asPath;
    const currentLanguage = router.locale || '';
    const pathWithoutLanguage = currentPath.replace(`/${currentLanguage}`, '');
    const newPath = `/${pathWithoutLanguage}`;

    router.push(newPath, newPath, {locale: language});
  };

  return (
    <div className="flex justify-center space-x-4">
      <a href="#" onClick={() => changeLanguage('en')}><img src='/images/en.png' width='32'/></a>
      <a href="#"  onClick={() => changeLanguage('ja')}><img src='/images/ja.png' width='32' /></a>
      <a href="#"  onClick={() => changeLanguage('fr')}><img src='/images/fr.png' width='32' /></a>
    </div>
  );
}

export default LanguageSwitcher;