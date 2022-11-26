import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {globalCss, styled} from '@stitches/react';

import {Register} from './pages/Register';
import {Header} from './components/Header';
import {useMeQuery} from './graphql/gen';
import {Collection} from './pages/Collection';
import {Devices} from './pages/Devices';
import {Authenticate} from './pages/Authenticate';
import {Feed} from './pages/Feed';
import {Wallpaper} from './pages/Wallpaper';
import {Suspense} from 'react';

interface AppProps {}

const globalStyles = globalCss({
  '*': {margin: 0, padding: 0, boxSizing: 'border-box'},
  html: {
    maxWidth: '100%',
    backgroundColor: 'rgb(250, 250, 250)',
  },
});
globalStyles();

function App({}: AppProps) {
  const [res] = useMeQuery();
  console.log(res);
  return (
    <BrowserRouter>
      <Suspense>
        <Container>
          <Header />
          <Routes>
            <Route path="/" element={<Feed />} />
            <Route path="collection/:id" element={<Collection />} />
            <Route path="wallpaper/:id" element={<Wallpaper />} />
            <Route path="register" element={<Register />} />
            <Route path="authenticate" element={<Authenticate />} />
            <Route path="account/devices" element={<Devices />} />
          </Routes>
        </Container>
      </Suspense>
    </BrowserRouter>
  );
}

const Container = styled('div', {
  overflowX: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
  width: '825px',
  gap: '5vmin',
});

export default App;
