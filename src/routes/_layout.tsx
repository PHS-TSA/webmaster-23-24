import { Partial } from "$fresh/runtime.ts";
import type { PageProps } from "$fresh/server.ts";
import type { VNode } from "preact";
import { Footer } from "../components/Footer.tsx";
import { Header } from "../components/Header.tsx";

export default function Layout({ Component, url }: PageProps): VNode {
  return (
    <div class="flex min-h-screen flex-col">
      <Partial name="body">
        <Header active={url.pathname} />
        <Component />
      </Partial>
      <Footer class="mt-auto" />
    </div>
  );
}
