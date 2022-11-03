import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {Provider as UrqlProvider} from 'urql';
import './index.css';
import {urqlClient} from './utils';
import {ThemeProvider} from './components/system/theme/theme-provider';
import {vars} from './components/system/theme/global-theme.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={vars}>
      <UrqlProvider value={urqlClient}>
        <App />
      </UrqlProvider>
    </ThemeProvider>
  </React.StrictMode>,
);
