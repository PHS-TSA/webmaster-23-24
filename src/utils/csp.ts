import { SELF, STRICT_DYNAMIC, UNSAFE_INLINE, useCSP } from "$fresh/runtime.ts";

export function useCsp(): void {
  useCSP((csp) => {
    csp.directives.scriptSrc ??= [];
    csp.directives.scriptSrcElem ??= [];
    csp.directives.styleSrc ??= [];
    csp.directives.styleSrcElem ??= [];
    csp.directives.imgSrc ??= [];
    csp.directives.connectSrc ??= [];
    csp.directives.manifestSrc ??= [];

    csp.directives.scriptSrc.push(STRICT_DYNAMIC);
    csp.directives.scriptSrcElem.push(SELF, UNSAFE_INLINE);
    csp.directives.styleSrc.push(SELF);
    csp.directives.styleSrcElem.push(SELF, STRICT_DYNAMIC);
    csp.directives.imgSrc.push(SELF, "data:");
    csp.directives.connectSrc.push(SELF);
    csp.directives.manifestSrc.push(SELF);
  });
}
