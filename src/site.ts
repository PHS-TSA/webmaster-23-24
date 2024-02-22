const punctuationlessSiteName = "Why Switch";

/**
 * The name of the website.
 */
export const siteName = `${punctuationlessSiteName}?`;

/**
 * The slogan of the website.
 */
export const slogan = "The Truth About Going Green";

/**
 * A basic description of the website's content.
 */
export const description = `${punctuationlessSiteName} is an informative website about clean and green energy.`;

/**
 * The keywords for the website.
 */
export const keywords = "green, clean, renewable, tsa";

export type Title<T extends string> = `${T} | ${typeof siteName}`;

/**
 * Create a title for a page.
 */
export function makeTitle<const T extends string>(pageTitle: T): Title<T> {
  return `${pageTitle} | ${siteName}`;
}

// export const faviconSvgUrl = "/favicon.svg";
// export const faviconPngUrl = "/favicon.png";
// export const logoSvgUrl = "/logo.svg";
// export const logoAlt = `${siteName}'s logo`;
