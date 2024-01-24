import { Partial } from "$fresh/runtime.ts";
import type { PageProps } from "$fresh/server.ts";
import type { JSX } from "preact";
import { Footer } from "../components/Footer.tsx";
import { Header } from "../components/Header.tsx";

/**
 * Render the layout for all pages.
 *
 * @param props - The component's properties.
 * @param props.Component - The page component.
 * @param props.url - The URL of the page.
 * @returns The rendered layout.
 */
export default function Layout({ Component, url }: PageProps): JSX.Element {
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
