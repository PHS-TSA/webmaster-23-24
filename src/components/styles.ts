import { tw } from "../utils/tailwind.ts";

/**
 * A nice round button.
 */
export const floatingButtonStyles = tw`flex size-14 flex-row items-center justify-center rounded-full focus-visible:outline-none`;

/**
 * Rounded blue button styles.
 *
 * @see {@link floatingButtonStyles}
 */
export const blueButtonStyles = tw`bg-blue-400 shadow-md dark:bg-blue-800 focus-visible:ring-1 focus-visible:ring-offset-2`;

/**
 * Make focus rings tolerable.
 */
export const prettyFocus = tw`focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-50/70`;
