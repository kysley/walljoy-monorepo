import {styled} from '@stitches/react';
import React, {useEffect} from 'react';
import {CgArrowLongLeft, CgDesktop, CgUser} from 'react-icons/cg';
import {Link, NavLink, useLocation, useNavigate} from 'react-router-dom';
import {useMeQuery} from '../graphql/gen';
// import {useSigninQuery} from '../graphql/gen';
import {Stack} from './system';

const BackButton = ({children}) => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(-1)}
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '5px',
        background: 'silver',
        outline: 'none',
        // border: 'none',
        // border: '1px solid ',
        height: '27px',
        cursor: 'pointer',
        boxShadow:
          // 'rgb(60,60,60) -1px -1px inset, rgb(120, 90, 230) 2px 2px inset',
          '-1px -1px 0 #FFFFFF inset, 1px 1px 0px #999 inset',
      }}
    >
      {children}
    </button>
  );
};

export const Header = () => {
  // const [res] = useSigninQuery();
  const [res] = useMeQuery();

  return (
    <Container>
      <div
        style={{
          fontSize: '2.5em',
          fontWeight: 700,
        }}
      >
        walljoy
      </div>
      <Stack direction="row">
        <Link to="/">Feed</Link>
        {/* <DropdownTarget>
          Collections
          <Dropdown direction="column">
            <Link to="/c/1">Random</Link>
            <Link to="/c/2">Structure</Link>
            <Link to="/c/3">Earth</Link>
          </Dropdown>
        </DropdownTarget> */}
      </Stack>
      {res.data?.me && (
        <div>
          <CgUser size="24" />
          {res.data?.me.email}
          <NavLink to="account/devices">
            <CgDesktop size="24" />
            Devices
          </NavLink>
        </div>
      )}
    </Container>
  );
};

const Container = styled('header', {
  display: 'grid',
  gridTemplateColumns: 'auto auto auto',
  alignItems: 'center',
  padding: '2em',
});

const Dropdown = styled(Stack, {
  display: 'none',
  position: 'absolute',
  zIndex: 100,
  top: '18px',
  border: '1px solid black',
  background: 'wheat',
  padding: '5px',
  '&:hover': {
    display: 'flex',
  },
});

const DropdownTarget = styled('nav', {
  display: 'flex',
  cursor: 'pointer',
  position: 'relative',
  '&:hover': {
    [String(Dropdown)]: {
      display: 'flex',
    },
  },
});
