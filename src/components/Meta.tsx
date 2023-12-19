import type { FunctionalComponent } from "preact";
import Title from "./Title.tsx";
import { description, logoAlt, logoSvgUrl, siteName } from "../site.ts";

interface Props {
  title?: string;
  desc?: string;
}

const Meta: FunctionalComponent<Props> = (
  {
    title = siteName,
    desc = description,
  },
) => (
  <>
    <Title title={title} />
    <meta property="og:image" content={logoSvgUrl} key="og:i" />
    <meta property="og:image:secure_url" content={logoSvgUrl} key="og:si" />
    <meta property="og:image:alt" content={logoAlt} key="og:ai" />
    <meta property="og:title" content="Home" key="og:title" />
    <meta property="og:url" content="/" key="og:url" />
    <meta property="og:description" content={desc} key="og:desc" />
    <meta property="og:site_name" content={siteName} />
    <meta property="og:locale" content="en_US" />
    <meta property="og:type" content="website" />
    <meta property="twitter:card" content="summary" key="t:card" />
    <meta property="twitter:title" content="Home" key="t:title" />
    <meta property="twitter:description" content={desc} key="t:desc" />
    <meta property="twitter:image" content="/logo.svg" key="t:i" />
    <meta property="twitter:image:alt" content={logoAlt} key="t:ai" />
  </>
);

export { Meta as default };
