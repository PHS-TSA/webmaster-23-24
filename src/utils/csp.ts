import {
  NONE,
  SELF,
  STRICT_DYNAMIC,
  UNSAFE_INLINE,
  useCSP,
} from "$fresh/runtime.ts";

export function useCsp(): void {
  useCSP((csp) => {
    csp.directives.scriptSrc ??= [];
    csp.directives.scriptSrcElem ??= [];
    csp.directives.styleSrc ??= [];
    csp.directives.styleSrcElem ??= [];
    csp.directives.imgSrc ??= [];
    csp.directives.mediaSrc ??= [];
    csp.directives.connectSrc ??= [];
    csp.directives.manifestSrc ??= [];
    csp.directives.baseUri ??= [NONE];
    csp.directives.frameSrc ??= [];

    csp.directives.scriptSrc.push(
      STRICT_DYNAMIC,
      UNSAFE_INLINE, // Backwards compatibility for old browsers.
      "https:", // Backwards compatibility for older browsers.
      "http:", // Backwards compatibility for oldest browsers.
    );
    csp.directives.scriptSrcElem.push(
      SELF,
      UNSAFE_INLINE, // Needed for Fresh hot-reload.
    );
    csp.directives.styleSrc.push(SELF);
    csp.directives.styleSrcElem.push(
      SELF,
      STRICT_DYNAMIC,
      UNSAFE_INLINE, // Backwards compatibility for old browsers.
    );
    csp.directives.imgSrc.push(SELF, "data:");
    csp.directives.mediaSrc.push(SELF);
    csp.directives.connectSrc.push(SELF);
    csp.directives.manifestSrc.push(SELF);
    csp.directives.frameSrc.push(SELF);
  });
}
