import {CSS} from '@stitches/react/types/css-util';
import {style} from '@vanilla-extract/css';
import {CSSProperties, ReactNode} from 'react';
import {Stack} from '../system';
import {system} from '../system/theme/sprinkles.css';
import {pageStyles, titleStyles} from './page.css';

type PageProps = {
  title: string;
  children: ReactNode;
};

export const Page = ({title, children}: PageProps) => {
  return (
    <main>
      <Stack>
        <h1 className={titleStyles}>{title}</h1>
        <section className={pageStyles}>{children}</section>
      </Stack>
    </main>
  );
};
