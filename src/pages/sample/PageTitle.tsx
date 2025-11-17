import React from 'react';


type PageTitleProps = {
  language: string;
};

const getPageTitle = (language: string) => {
    if (language == 'japanese') {
      return 'サイゼリヤ メニュー';
    } else {
      return 'Saizeriya Menu';
    }
  }

const PageTitle: React.FC<PageTitleProps> = ({ language: language }) => (
  <header className='page-title'>
    <h1>{getPageTitle(language)}</h1>
  </header>
);

export default PageTitle;