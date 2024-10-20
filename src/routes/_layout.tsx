import type { PageProps } from "$fresh/server.ts";
import { clsx } from "clsx";
import type { JSX } from "preact";
import { Footer } from "../components/Footer.tsx";
import { Header } from "../components/Header.tsx";
import { Chatbot } from "../islands/Chatbot.tsx";
import { ScrollToTop } from "../islands/ScrollToTop.tsx";
import { constants as openAiConstants } from "../utils/openai/assistant.ts";

/**
 * Render the layout for all pages.
 *
 * @param props - The component's properties.
 * @param props.Component - The page component.
 * @param props.url - The URL of the page.
 * @returns The rendered layout.
 */
export default function Layout({ Component, url }: PageProps): JSX.Element {
  const buttonPosStyles = "z-50 fixed right-3 sm:right-10";

  return (
    <div class="flex min-h-screen flex-col place-content-center">
      <Header active={url.pathname} />
      <Component />
      <div class={clsx(buttonPosStyles, "bottom-28")}>
        <ScrollToTop />
      </div>
      {openAiConstants === undefined ? null : (
        <div class={clsx(buttonPosStyles, "bottom-10")}>
          <Chatbot />
        </div>
      )}
      <Footer class="mt-auto" />
    </div>
  );
}
