import 'core-js';
import 'normalize.css';
import './libs/contextmenu.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { isMobile } from './utils';
import { setLocale, setTranslations } from 'react-i18nify';
import i18n from './i18n';

import App from './App';
import Mobile from './Mobile';
import GlobalStyle from './GlobalStyle';
import { ThemeProvider } from 'styled-components';

setTranslations(i18n);
const language = navigator.language.toLowerCase();
const defaultLang = i18n[language] ? language : 'en';
setLocale(defaultLang);

const theme = {
  colors: {
    cyan: {
      0: 'rgb(8 145 178)',
      1: 'rgb(6 182 212)',
      2: 'rgb(6 182 212)',
    },
    white: 'rgb(255 255 255)',
    gray: {
      0: 'rgb(23 23 23)',
      1: 'rgb(38 38 38)',
      2: 'rgb(82 82 82)',
      3: 'rgb(212 212 212)',
      4: 'rgb(250, 250, 250)'
    },
  },
  text: {
    sm: '.875rem'
  },
  rounded: {
    lg: '.5rem'
  },
}

ReactDOM.render(
  <React.Fragment>
    <ThemeProvider theme = {theme}>
      <GlobalStyle />
      {isMobile ? <Mobile /> : <App defaultLang={defaultLang} />}
    </ThemeProvider>
  </React.Fragment>,
  document.getElementById('root'),
);
