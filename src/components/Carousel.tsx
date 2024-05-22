import { asset } from "$fresh/runtime.ts";
import type { JSX } from "preact";
import { ScrollDown } from "../islands/ScrollDown.tsx";
import { css } from "../utils/tags.ts";
import type { HeroProps } from "./Cover.tsx";

export interface CarouselProps extends HeroProps {
  heros: string[];
  scrollDown?: boolean;
}

export function Carousel({
  children,
  heros,
  scrollDown,
}: CarouselProps): JSX.Element {
  const totalAnimationTime = heros.length * 5;
  const visibilityPercentage = 100 / (2 * heros.length);

  const keyframes = css`
    0% {
      opacity: 0;
    }
    ${visibilityPercentage}%,
    ${2 * visibilityPercentage}% {
      opacity: 1;
    }
    ${3 * visibilityPercentage}%,
    100% {
      opacity: 0;
    }
`;

  const delays = heros
    .map((_, i) => {
      return css`
        &:nth-child(${i + 1}) {
          animation-delay: ${
            (i * 2 * visibilityPercentage * totalAnimationTime) / 100
          }s;
        }
    `;
    })
    .join("\n");

  const styles = css`
    .carousel > img {
      opacity: 0;
      animation: animate-fade ${totalAnimationTime}s infinite;
    }

    .carousel.hero > img {
      @supports(animation-timeline: --page-scroll, auto) {
        animation: image-down linear both, animate-fade ${totalAnimationTime}s infinite;
        animation-range: 0 100svh, normal;
      }
    }

    .carousel > img {
      ${delays}
    }

    @keyframes animate-fade {
      ${keyframes}
    }
  `;

  return (
    <div class="relative flex h-[65svh] flex-col px-4 pt-2 sm:pt-3 md:h-[75svh] md:pt-4 lg:h-svh lg:pt-24">
      {/* biome-ignore lint/security/noDangerouslySetInnerHtml: It's just CSS that we control. */}
      <style dangerouslySetInnerHTML={{ __html: styles }} />

      <div class="carousel hero">
        {heros.map((hero) => (
          <img key={hero} src={asset(hero)} alt="" />
        ))}
      </div>
      <div class="relative z-10 flex items-center justify-center">
        {children}
      </div>
      {scrollDown && (
        <div class="absolute bottom-4 sm:bottom-1 md:bottom-14 lg:bottom-32 left-1/2 -translate-x-1/2">
          <ScrollDown />
        </div>
      )}
    </div>
  );
}
