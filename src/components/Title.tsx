import type { FunctionalComponent } from "preact";
import { makeTitle } from "../site.ts";

interface Props {
  children: string;
}

const Title: FunctionalComponent<Props> = ({ children }) => (
  <title>{makeTitle(children)}</title>
);

export { Title as default };
