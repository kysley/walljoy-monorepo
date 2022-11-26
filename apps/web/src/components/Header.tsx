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
      <Link to="/" style={{color: 'inherit', textDecoration: 'none'}}>
        <h1>walljoy</h1>
      </Link>
      {/* <NavLink to="/">Feed</NavLink> */}
      {res.data?.me && (
        <div
          style={{
            alignItems: 'center',
            display: 'flex',
            justifySelf: 'flex-end',
            gap: '48px',
          }}
        >
          <NavLink to="account/devices">Devices</NavLink>
          {res.data?.me.email}
        </div>
      )}
    </Container>
  );
};

const Container = styled('header', {
  display: 'grid',
  gridTemplateColumns: 'auto 1fr',
  gap: '32px',
  alignItems: 'center',
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
