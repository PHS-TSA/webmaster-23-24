import type { PageProps } from "$fresh/server.ts";
import type { FunctionalComponent } from "preact";
import Footer from "../components/Footer.tsx";
import Header from "../components/Header.tsx";

const Layout: FunctionalComponent<PageProps> = ({ Component, url }) => (
  <div class="flex flex-col min-h-screen">
    <Header active={url.pathname} />
    <Component />
    <Footer class="mt-auto" />
  </div>
);

export { Layout as default };
