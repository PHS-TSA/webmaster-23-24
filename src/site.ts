const punctuationlessSiteName = "Why Switch" as const;

/**
 * The name of the website.
 */
export const siteName = `${punctuationlessSiteName}?` as const;

/**
 * The slogan of the website.
 */
export const slogan = "The Truth About Going Green" as const;

/**
 * A basic description of the website's content.
 */
export const description =
  `${punctuationlessSiteName} is an informative website about clean and green energy.` as const;

/**
 * The keywords for the website.
 */
export const keywords = "green, clean, renewable, tsa" as const;

export type Title<T extends string> = `${T} | ${typeof siteName}`;

/**
 * Create a title for a page.
 */
export function makeTitle<const T extends string>(pageTitle: T): Title<T> {
  return `${pageTitle} | ${siteName}` as const;
}

export const faviconIcoUrl = "/favicon.ico" as const;
export const faviconSvgUrl = "/favicon.svg" as const;
export const appleTouchIconPngUrl = "/apple-touch-icon.png" as const;
export const logoSvgUrl = "/logo.svg" as const;
export const logoAlt =
  `The ${siteName} logo: a question mark overlaying a light switch` as const;
