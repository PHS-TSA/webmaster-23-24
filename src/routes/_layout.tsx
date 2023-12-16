import type { PageProps } from "$fresh/server.ts";
import Footer from "../components/Footer.tsx";
import Header from "../components/Header.tsx";

export default function Layout({ Component, url }: PageProps) {
  return (
    <>
      <div class="flex flex-col min-h-screen">
        <Header active={url.pathname} />
        <Component />
        <div class="mt-auto">
          <Footer />
        </div>
      </div>
    </>
  );
}
