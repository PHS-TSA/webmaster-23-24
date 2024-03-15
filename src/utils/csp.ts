import { SELF, UNSAFE_INLINE, useCSP } from "$fresh/runtime.ts";

export function useCsp(): void {
  useCSP((csp) => {
    csp.directives.scriptSrcElem ??= [];
    csp.directives.styleSrcElem ??= [];
    csp.directives.imgSrc ??= [];
    csp.directives.manifestSrc ??= [];

    csp.directives.scriptSrcElem.push(SELF, UNSAFE_INLINE);
    csp.directives.styleSrcElem.push(SELF);
    csp.directives.imgSrc.push(SELF);
    csp.directives.manifestSrc.push(SELF);
  });
}
