import {createSprinkles, defineProperties} from '@vanilla-extract/sprinkles';
import {vars} from './global-theme.css';

const commonProperties = defineProperties({
  properties: {
    display: ['none', 'flex', 'grid'],
    flexDirection: ['column', 'row'],
    gridTemplateColumns: {
      twoColumn: '1fr 1fr',
    },
    // abbreviations for alignitems and such- not necessary (or wanted) -->
    alignItems: {
      start: 'flex-start',
      center: 'center',
      end: 'flex-end',
      stretch: 'stretch',
    },
    justifyContent: {
      start: 'flex-start',
      center: 'center',
      end: 'flex-end',
      stretch: 'stretch',
    },
    flexWrap: ['wrap'],
    flexGrow: {
      yes: 1,
      no: 0,
    },
    flexShrink: {
      yes: 1,
      no: 0,
    },
    // <--
    flexBasis: {
      '1/2': `${100 / 2}%`,
      '1/3': `${100 / 3}%`,
      '2/3': `${200 / 3}%`,
      '1/4': `${100 / 4}%`,
      '3/4': `${300 / 4}%`,
      '1/5': `${100 / 5}%`,
      '2/5': `${200 / 5}%`,
      '3/5': `${300 / 5}%`,
      '4/5': `${400 / 5}%`,
    },

    marginTop: vars.spacing,
    marginBottom: vars.spacing,
    marginLeft: vars.spacing,
    marginRight: vars.spacing,

    paddingTop: vars.spacing,
    paddingBottom: vars.spacing,
    paddingLeft: vars.spacing,
    paddingRight: vars.spacing,

    gap: vars.spacing,
    rowGap: vars.spacing,

    borderWidth: {
      standard: '1px',
    },

    borderStyle: ['solid', 'dotted'],

    borderColor: vars.flatColors,

    borderRadius: vars.radii,

    color: vars.flatColors,
    backgroundColor: vars.flatColors,

    fontSize: vars.typography,
  },
  shorthands: {
    margin: ['marginTop', 'marginBottom', 'marginLeft', 'marginRight'],
    m: ['marginTop', 'marginBottom', 'marginLeft', 'marginRight'],
    marginX: ['marginLeft', 'marginRight'],
    marginY: ['marginTop', 'marginBottom'],

    padding: ['paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft'],
    paddingX: ['paddingLeft', 'paddingRight'],
    paddingY: ['paddingTop', 'paddingBottom'],
  },
});

export const system = createSprinkles(commonProperties);
export type Sprinkles = Parameters<typeof system>[0];
