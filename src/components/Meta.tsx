import type { JSX } from "preact";
import {
  description as defaultDescription,
  keywords as defaultKeywords,
  siteName as defaultSiteName,
  logoAlt,
  logoSvgUrl,
} from "../site.ts";
import { Title } from "./Title.tsx";

/**
 * Properties for the {@linkcode Meta} component.
 */
export interface MetaProps {
  /**
   * The title of the page.
   */
  readonly title?: string;

  /**
   * The description of the page.
   */
  readonly description?: string;

  /**
   * The keywords of the page.
   */
  readonly keywords?: string;
}

/**
 * Render a meta component, which stores metadata about the page.
 * It contains the title and description of the page, as well as some Open Graph and Twitter[^1] metadata for social media.
 *
 * [^1]: No, it's not X yet. Backwards compatibility :)
 *
 * @param props - The component's properties.
 * @param props.title - The title of the page.
 * @param props.description - The description of the page.
 * @returns The rendered meta component.
 */
export function Meta({
  title = defaultSiteName,
  description = defaultDescription,
  keywords = defaultKeywords,
}: MetaProps): JSX.Element {
  return (
    <>
      <Title>{title}</Title>
      <meta name="description" content={description} key="desc" />
      <meta name="keywords" content={keywords} key="keys" />
      <meta property="og:image" content={logoSvgUrl} key="og:i" />
      <meta property="og:image:secure_url" content={logoSvgUrl} key="og:si" />
      <meta property="og:image:alt" content={logoAlt} key="og:ai" />
      <meta property="og:title" content="Home" key="og:title" />
      <meta property="og:url" content="/" key="og:url" />
      <meta property="og:description" content={description} key="og:desc" />
      <meta property="og:site_name" content={defaultSiteName} />
      <meta property="og:locale" content="en_US" />
      <meta property="og:type" content="website" />
      <meta property="twitter:card" content="summary" key="t:card" />
      <meta property="twitter:title" content="Home" key="t:title" />
      <meta property="twitter:description" content={description} key="t:desc" />
      {/* <meta property="twitter:image" content={logoSvgUrl} key="t:i" /> */}
      {/* <meta property="twitter:image:alt" content={logoAlt} key="t:ai" /> */}
    </>
  );
}
