import type { PageProps } from "$fresh/server.ts";
import Header from "../components/Header.tsx";

export default function Layout({ Component, url }: PageProps) {
  return (
    <>
      <div class="layout">
        <Header active={url.pathname} />
        <Component />
      </div>
    </>
  );
}
