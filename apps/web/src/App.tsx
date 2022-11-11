import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {globalCss, styled} from '@stitches/react';

import {Register} from './pages/Register';
import {Header} from './components/Header';
import {useMeQuery} from './graphql/gen';
import {Collection} from './pages/Collection';
import {Devices} from './pages/Devices';
import {Authenticate} from './pages/Authenticate';
import {Feed} from './pages/Feed';

interface AppProps {}

const globalStyles = globalCss({
  '*': {margin: 0, padding: 0, boxSizing: 'border-box'},
  html: {
    maxWidth: '100vw',
    backgroundColor: 'rgb(250, 250, 250)',
  },
});
globalStyles();

function App({}: AppProps) {
  const [res] = useMeQuery();
  console.log(res);
  return (
    <BrowserRouter>
      <Container className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Feed />} />
          <Route path="c/:id" element={<Collection />} />
          {/* <Route path="w/:id" element={<Wallpaper />} /> */}
          <Route path="register" element={<Register />} />
          <Route path="authenticate" element={<Authenticate />} />
          <Route path="account/devices" element={<Devices />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

const Container = styled('div', {
  width: '100vw',
  minHeight: '100vh',
  justifyContent: 'center',
  // alignItems: 'center',
  display: 'grid',
  gridTemplateRows: '1fr 9fr',
  gap: '5vmin',
  flexDirection: 'column',
});

export default App;
