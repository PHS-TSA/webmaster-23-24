import type { VNode } from "preact";
import { makeTitle } from "../site.ts";

export interface TitleProps {
  readonly children: string;
}

export function Title({ children }: TitleProps): VNode {
  return <title>{makeTitle(children)}</title>;
}
