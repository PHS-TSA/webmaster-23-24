import type { JSX } from "preact";
import { makeTitle } from "../site.ts";

export interface TitleProps {
  readonly children: string;
}

export function Title({ children }: TitleProps): JSX.Element {
  return <title>{makeTitle(children)}</title>;
}
