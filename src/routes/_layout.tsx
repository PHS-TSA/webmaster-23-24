import type { PageProps } from "$fresh/server.ts";
import Footer from "../components/Footer.tsx";
import Header from "../components/Header.tsx";

export default function Layout({ Component, url }: PageProps) {
  return (
    <>
      <div class="layout">
        <Header active={url.pathname} />
        <Component />
        <Footer />
      </div>
    </>
  );
}
