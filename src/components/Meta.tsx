import type { VNode } from "preact";
import {
  description as defaultDescription,
  siteName as defaultSiteName,
} from "../site.ts";
import { Title } from "./Title.tsx";

export interface MetaProps {
  readonly title?: string;
  readonly description?: string;
}

export function Meta({
  title = defaultSiteName,
  description = defaultDescription,
}: MetaProps): VNode {
  return (
    <>
      <Title>{title}</Title>
      {/* <meta property="og:image" content={logoSvgUrl} key="og:i" /> */}
      {/* <meta property="og:image:secure_url" content={logoSvgUrl} key="og:si" /> */}
      {/* <meta property="og:image:alt" content={logoAlt} key="og:ai" /> */}
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
