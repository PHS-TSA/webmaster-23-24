import { z } from "zod";

export interface StateData {
  /** Years */
  payoff: number;

  /** Per month */
  savings: number;
  install: number;
  /** A percentage */
  rebate: number;
  emissions: number;
}

export type State = z.infer<typeof regionSchema>;

export const stateData = {
  Alabama: {
    payoff: 4.97,
    savings: 2123 / 12,
    install: 10542,
    rebate: (10542 / 70) * 100 * 0.3,
    emissions: 1178 * 0.86,
  },

  Alaska: {
    payoff: 6.56,
    savings: 1669 / 12,
    install: 10941,
    rebate: (10941 / 70) * 100 * 0.3,
    emissions: 6.56 * 0.86,
  },

  Arizona: {
    payoff: 5.76,
    savings: 1849 / 12,
    install: 10654,
    rebate: (10654 / 70) * 100 * 0.3,
    emissions: 5.76 * 0.86,
  },

  Arkansas: {
    payoff: 6.95,
    savings: 1693 / 12,
    install: 11771,
    rebate: (11771 / 70) * 100 * 0.3,
    emissions: 6.95 * 0.86,
  },

  California: {
    payoff: 6.8,
    savings: 1715 / 12,
    install: 11666,
    rebate: (11666 / 70) * 100 * 0.3,
    emissions: 6.8 * 0.86,
  },

  Colorado: {
    payoff: 10.17,
    savings: 1207 / 12,
    install: 12278,
    rebate: (12278 / 70) * 100 * 0.3,
    emissions: 10.17 * 0.86,
  },

  Connecticut: {
    payoff: 5.05,
    savings: 2487 / 12,
    install: 12558,
    rebate: (12558 / 70) * 100 * 0.3,
    emissions: 5.05 * 0.86,
  },

  Delaware: {
    payoff: 5.79,
    savings: 1972 / 12,
    install: 11414,
    rebate: (11414 / 70) * 100 * 0.3,
    emissions: 5.79 * 0.86,
  },

  "District of Columbia": {
    payoff: 8.17,
    savings: 1481 / 12,
    install: 12100,
    rebate: (12100 / 70) * 100 * 0.3,
    emissions: 8.17 * 0.86,
  },

  Florida: {
    payoff: 5.71,
    savings: 2064 / 12,
    install: 11788,
    rebate: (11788 / 70) * 100 * 0.3,
    emissions: 5.71 * 0.86,
  },

  Georgia: {
    payoff: 6.43,
    savings: 1808 / 12,
    install: 11634,
    rebate: (11634 / 70) * 100 * 0.3,
    emissions: 6.43 * 0.86,
  },

  Hawaii: {
    payoff: 4.35,
    savings: 2638 / 12,
    install: 11466,
    rebate: (11466 / 70) * 100 * 0.3,
    emissions: 4.35 * 0.86,
  },

  Idaho: {
    payoff: 8.26,
    savings: 1465 / 12,
    install: 12107,
    rebate: (12107 / 70) * 100 * 0.3,
    emissions: 8.26 * 0.86,
  },

  Illinois: {
    payoff: 9.61,
    savings: 1368 / 12,
    install: 13146,
    rebate: (13146 / 70) * 100 * 0.3,
    emissions: 9.61 * 0.86,
  },

  Indiana: {
    payoff: 7.65,
    savings: 1729 / 12,
    install: 13230,
    rebate: (13230 / 70) * 100 * 0.3,
    emissions: 7.65 * 0.86,
  },

  Iowa: {
    payoff: 8.67,
    savings: 1425 / 12,
    install: 12348,
    rebate: (12348 / 70) * 100 * 0.3,
    emissions: 8.67 * 0.86,
  },

  Kansas: {
    payoff: 7.31,
    savings: 1528 / 12,
    install: 11172,
    rebate: (11172 / 70) * 100 * 0.3,
    emissions: 7.31 * 0.86,
  },

  Kentucky: {
    payoff: 6.55,
    savings: 1705 / 12,
    install: 11172,
    rebate: (11172 / 70) * 100 * 0.3,
    emissions: 6.55 * 0.86,
  },

  Louisiana: {
    payoff: 6.76,
    savings: 1761 / 12,
    install: 11907,
    rebate: (11907 / 70) * 100 * 0.3,
    emissions: 6.76 * 0.86,
  },

  Maine: {
    payoff: 6.61,
    savings: 2038 / 12,
    install: 13461,
    rebate: (13461 / 70) * 100 * 0.3,
    emissions: 6.61 * 0.86,
  },

  Maryland: {
    payoff: 5.8,
    savings: 2137 / 12,
    install: 12401,
    rebate: (12401 / 70) * 100 * 0.3,
    emissions: 5.8 * 0.86,
  },

  Massachusetts: {
    payoff: 7.82,
    savings: 2137 / 12,
    install: 15162,
    rebate: (15162 / 70) * 100 * 0.3,
    emissions: 7.82 * 0.86,
  },

  Michigan: {
    payoff: 8.97,
    savings: 1491 / 12,
    install: 13377,
    rebate: (13377 / 70) * 100 * 0.3,
    emissions: 8.97 * 0.86,
  },

  Minnesota: {
    payoff: 9.23,
    savings: 1418 / 12,
    install: 13083,
    rebate: (13083 / 70) * 100 * 0.3,
    emissions: 9.23 * 0.86,
  },

  Mississippi: {
    payoff: 5.84,
    savings: 1946 / 12,
    install: 11361,
    rebate: (11361 / 70) * 100 * 0.3,
    emissions: 5.84 * 0.86,
  },

  Missouri: {
    payoff: 7.35,
    savings: 1605 / 12,
    install: 11792,
    rebate: (11792 / 70) * 100 * 0.3,
    emissions: 7.35 * 0.86,
  },

  Montana: {
    payoff: 7.84,
    savings: 1412 / 12,
    install: 11067,
    rebate: (11067 / 70) * 100 * 0.3,
    emissions: 7.84 * 0.86,
  },

  Nebraska: {
    payoff: 8.42,
    savings: 1472 / 12,
    install: 12390,
    rebate: (12390 / 70) * 100 * 0.3,
    emissions: 8.42 * 0.86,
  },

  Nevada: {
    payoff: 6.52,
    savings: 1649 / 12,
    install: 10752,
    rebate: (10752 / 70) * 100 * 0.3,
    emissions: 6.52 * 0.86,
  },

  "New Hampshire": {
    payoff: 7.17,
    savings: 1926 / 12,
    install: 13818,
    rebate: (13818 / 70) * 100 * 0.3,
    emissions: 7.17 * 0.86,
  },

  "New Jersey": {
    payoff: 6.58,
    savings: 1858 / 12,
    install: 12222,
    rebate: (12222 / 70) * 100 * 0.3,
    emissions: 6.58 * 0.86,
  },

  "New Mexico": {
    payoff: 10.52,
    savings: 1147 / 12,
    install: 12065,
    rebate: (12065 / 70) * 100 * 0.3,
    emissions: 10.52 * 0.86,
  },

  "New York": {
    payoff: 8.11,
    savings: 1613 / 12,
    install: 13083,
    rebate: (13083 / 70) * 100 * 0.3,
    emissions: 8.11 * 0.86,
  },

  "North Carolina": {
    payoff: 6.06,
    savings: 1897 / 12,
    install: 11487,
    rebate: (11487 / 70) * 100 * 0.3,
    emissions: 6.06 * 0.86,
  },

  "North Dakota": {
    payoff: 6.6,
    savings: 1566 / 12,
    install: 10332,
    rebate: (10332 / 70) * 100 * 0.3,
    emissions: 6.6 * 0.86,
  },

  Ohio: {
    payoff: 6.85,
    savings: 1679 / 12,
    install: 11498,
    rebate: (11498 / 70) * 100 * 0.3,
    emissions: 6.85 * 0.86,
  },

  Oklahoma: {
    payoff: 6.04,
    savings: 1839 / 12,
    install: 11102,
    rebate: (11102 / 70) * 100 * 0.3,
    emissions: 6.04 * 0.86,
  },

  Oregon: {
    payoff: 8.17,
    savings: 1503 / 12,
    install: 12285,
    rebate: (12285 / 70) * 100 * 0.3,
    emissions: 8.17 * 0.86,
  },

  Pennsylvania: {
    payoff: 6.48,
    savings: 1889 / 12,
    install: 12233,
    rebate: (12233 / 70) * 100 * 0.3,
    emissions: 6.48 * 0.86,
  },

  "Rhode Island": {
    payoff: 5.98,
    savings: 2246 / 12,
    install: 13419,
    rebate: (13419 / 70) * 100 * 0.3,
    emissions: 5.98 * 0.86,
  },

  "South Carolina": {
    payoff: 6.1,
    savings: 1889 / 12,
    install: 11519,
    rebate: (11519 / 70) * 100 * 0.3,
    emissions: 6.1 * 0.86,
  },

  "South Dakota": {
    payoff: 6.18,
    savings: 1649 / 12,
    install: 10192,
    rebate: (10192 / 70) * 100 * 0.3,
    emissions: 6.18 * 0.86,
  },

  Tennessee: {
    payoff: 6.73,
    savings: 1792 / 12,
    install: 12054,
    rebate: (12054 / 70) * 100 * 0.3,
    emissions: 6.73 * 0.86,
  },

  Texas: {
    payoff: 5.33,
    savings: 2079 / 12,
    install: 11088,
    rebate: (11088 / 70) * 100 * 0.3,
    emissions: 5.33 * 0.86,
  },

  Utah: {
    payoff: 10.71,
    savings: 1054 / 12,
    install: 11288,
    rebate: (11288 / 70) * 100 * 0.3,
    emissions: 10.71 * 0.86,
  },

  Vermont: {
    payoff: 8.57,
    savings: 1507 / 12,
    install: 12915,
    rebate: (12915 / 70) * 100 * 0.3,
    emissions: 8.57 * 0.86,
  },

  Virginia: {
    payoff: 6.54,
    savings: 1860 / 12,
    install: 12170,
    rebate: (12170 / 70) * 100 * 0.3,
    emissions: 6.54 * 0.86,
  },

  Washington: {
    payoff: 9.05,
    savings: 1379 / 12,
    install: 12485,
    rebate: (12485 / 70) * 100 * 0.3,
    emissions: 9.05 * 0.86,
  },

  "West Virginia": {
    payoff: 6.08,
    savings: 1942 / 12,
    install: 11813,
    rebate: (11813 / 70) * 100 * 0.3,
    emissions: 6.08 * 0.86,
  },

  Wisconsin: {
    payoff: 9.17,
    savings: 1400 / 12,
    install: 12842,
    rebate: (12842 / 70) * 100 * 0.3,
    emissions: 9.17 * 0.86,
  },

  Wyoming: {
    payoff: 8.29,
    savings: 1333 / 12,
    install: 11046,
    rebate: (11046 / 70) * 100 * 0.3,
    emissions: 8.29 * 0.86,
  },
} as const satisfies Record<string, StateData>;

// @ts-expect-error: Typescript types the core JS libs awfully ;).
export const states: (keyof typeof stateData)[] = Object.keys(stateData);

export const regionSchema = z.custom<keyof typeof stateData>(
  (region) =>
    z
      .string()
      // @ts-expect-error: And, of course, the stricter states typing breaks this ;).
      .refine((region2) => states.includes(region2))
      .safeParse(region).success,
);
