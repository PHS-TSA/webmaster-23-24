import type { PageProps } from "$fresh/server.ts";
import type { JSX } from "preact";
import { Footer } from "../components/Footer.tsx";
import { Header } from "../components/Header.tsx";
import { Chatbot } from "../islands/Chatbot.tsx";
import { ScrollToTop } from "../islands/ScrollToTop.tsx";

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
    <div class="flex min-h-screen flex-col place-content-center">
      <Header active={url.pathname} />
      <Component />
      <ScrollToTop class="z-50 fixed right-3 bottom-28 sm:right-10" />
      <Chatbot class="z-50 fixed right-3 bottom-10 sm:right-10" />
      <Footer class="mt-auto" />
    </div>
  );
}
