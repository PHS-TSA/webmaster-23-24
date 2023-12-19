import type { PageProps } from "$fresh/server.ts";
import Footer from "../components/Footer.tsx";
import Header from "../components/Header.tsx";
import type { FunctionalComponent } from "preact";

const Layout: FunctionalComponent<PageProps> = ({ Component, url }) => (
  <div class="flex flex-col min-h-screen">
    <Header active={url.pathname} />
    <Component />
    <Footer class="mt-auto" />
  </div>
);

export { Layout as default };
