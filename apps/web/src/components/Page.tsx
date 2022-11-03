import {CSS} from '@stitches/react/types/css-util';
import {style} from '@vanilla-extract/css';
import {CSSProperties, ReactNode} from 'react';
import {system} from './system/theme/sprinkles.css';

type PageProps = {
  title: string;
  children: ReactNode;
};

export const Page = ({title, children}: PageProps) => {
  return (
    <main style={styles}>
      <h1 className={titleStyles}>{title}</h1>
      <section>{children}</section>
    </main>
  );
};

const titleStyles = system({
  fontSize: 'jumbo',
});

const styles: CSSProperties = {
  justifyContent: 'center',
  margin: '0 10vmax',
  minHeight: '100vh',
};

const containerStyles = system({
  justifyContent: 'center',
  margin: 'large',
});
