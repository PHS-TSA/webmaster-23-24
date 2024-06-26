import type { ComponentType, JSX } from "preact";
import type { SolutionData } from "../../src/utils/solutions.ts";

/**
 * A valid JSX string component.
 */
type StringComponent = Extract<
  keyof JSX.IntrinsicElements,
  JSX.ElementType extends never ? string : JSX.ElementType
>;

/**
 * unknown allowed JSX component.
 */
type Component<Props> = ComponentType<Props> | StringComponent;

interface NestedMDXComponents {
  [key: string]: NestedMDXComponents | Component<unknown>;
}

// Public MDX helper types

/**
 * MDX components may be passed as the `components`.
 *
 * The key is the name of the element to override. The value is the component to render instead.
 */
export type MDXComponents = NestedMDXComponents & {
  [Key in StringComponent]?: Component<JSX.IntrinsicElements[Key]>;
} & {
  /**
   * If a wrapper component is defined, the MDX content will be wrapped inside of it.
   */
  wrapper?: Component<unknown>;
};

/**
 * The props that may be passed to an MDX component.
 */
export interface MDXProps {
  /**
   * Which props exactly may be passed into the component depends on the contents of the MDX
   * file.
   */
  [key: string]: unknown;

  /**
   * This prop may be used to customize how certain components are rendered.
   */
  components?: MDXComponents;
}

/**
 * The type of the default export of an MDX module.
 */
export type MDXContent = (props: MDXProps) => JSX.Element;

/**
 * A generic MDX module type.
 */
export interface MDXModule {
  /**
   * This could be unknown value that is exported from the MDX file.
   */
  [key: string]: unknown;

  /**
   * A functional JSX component which renders the content of the MDX file.
   */
  default: MDXContent;

  readonly frontmatter: SolutionData;
}
