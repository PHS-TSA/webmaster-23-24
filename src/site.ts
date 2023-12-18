const slogan = "The Truth About Going Green";
const description =
  "Why Switch is an informative website about green/green energy.";
const siteName = "Why Switch?";

function makeTitle(pageTitle: string): string {
  return `${pageTitle} | ${siteName}`;
}

const faviconSvgUrl = "/favicon.svg";
const faviconPngUrl = "/favicon.png";
const logoSvgUrl = "/logo.svg";
const logoAlt = `${siteName}'s logo`;

export {
  description,
  faviconPngUrl,
  faviconSvgUrl,
  logoAlt,
  logoSvgUrl,
  makeTitle,
  siteName,
  slogan,
};
