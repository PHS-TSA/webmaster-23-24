import { asset } from "$fresh/runtime.ts";
import { clsx } from "clsx";
import type { JSX } from "preact";
import { logoAlt } from "../site.ts";

/** Properties for the {@linkcode Logo} component. */
export interface LogoProps extends JSX.HTMLAttributes<HTMLImageElement> {
  /** Should the "?" in the logo be animated? */
  animated?: boolean;
}

/**
 * Render our logo.
 *
 * @param props - The component's properties.
 * @returns The rendered logo component.
 */
export function Logo(props: LogoProps): JSX.Element {
  return (
    <picture>
      {props.animated && (
        <>
          <source
            srcSet={asset("/logo-animated.webp")}
            media="(prefers-color-scheme: light)"
            type="image/webp"
            width={500}
            height={500}
            alt={logoAlt}
          />
          <source
            srcSet={asset("/logo-animated-dark.webp")}
            media="(prefers-color-scheme: dark)"
            type="image/webp"
            width={500}
            height={500}
            alt={logoAlt}
          />
        </>
      )}
      <img
        {...props}
        class={clsx("my-6", props.class)}
        src={asset("/logo.svg")}
        type="image/svg+xml"
        width={500}
        height={500}
        alt={logoAlt}
      />
    </picture>
  );
}
