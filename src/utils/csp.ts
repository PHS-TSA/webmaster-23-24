import { SELF, UNSAFE_INLINE, useCSP } from "$fresh/runtime.ts";

export function useCsp(): void {
  useCSP((csp) => {
    csp.directives.scriptSrcElem ??= [];
    csp.directives.styleSrc ??= [];
    csp.directives.styleSrcElem ??= [];
    csp.directives.imgSrc ??= [];
    csp.directives.connectSrc ??= [];
    csp.directives.manifestSrc ??= [];

    csp.directives.scriptSrcElem.push(SELF, UNSAFE_INLINE);
    csp.directives.styleSrc.push(SELF);
    csp.directives.styleSrcElem.push(SELF);
    csp.directives.imgSrc.push(SELF);
    csp.directives.connectSrc.push(SELF);
    csp.directives.manifestSrc.push(SELF);
  });
}
