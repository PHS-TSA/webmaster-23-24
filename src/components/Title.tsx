import type { FunctionalComponent } from "preact";
import { makeTitle } from "../site.ts";

interface Props {
  title: string;
}

const Title: FunctionalComponent<Props> = ({ title }) => {
  return <title>{makeTitle(title)}</title>;
};

export { Title as default };
