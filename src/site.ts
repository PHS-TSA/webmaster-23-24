/**
 * The name of the website.
 */
export const siteName = "Why Switch?";

/**
 * The slogan of the website.
 */
export const slogan = "The Truth About Going Green";

/**
 * A basic description of the website's content.
 */
export const description = `${siteName.replace(
  "?",
  "",
)} is an informative website about clean and green energy.`;

/**
 * The keywords for the website.
 */
export const keywords = "green, clean, renewable, tsa";

/**
 * Create a title for a page.
 */
export function makeTitle(pageTitle: string): string {
  return `${pageTitle} | ${siteName}`;
}

// export const faviconSvgUrl = "/favicon.svg";
// export const faviconPngUrl = "/favicon.png";
// export const logoSvgUrl = "/logo.svg";
// export const logoAlt = `${siteName}'s logo`;
