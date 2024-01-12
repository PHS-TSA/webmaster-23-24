import type { ComponentType } from "preact";

import IconBoltComponent from "$tabler_icons/bolt.tsx";
import IconBrandDenoComponent from "$tabler_icons/brand-deno.tsx";
import IconBrandReactComponent from "$tabler_icons/brand-react.tsx";
import IconBrandTailwindComponent from "$tabler_icons/brand-tailwind.tsx";
import IconChevronDownComponent from "$tabler_icons/chevron-down.tsx";
import IconLemon2Component from "$tabler_icons/lemon-2.tsx";
import IconSolarPanel2Component from "$tabler_icons/solar-panel-2.tsx";
import IconSolarPanelComponent from "$tabler_icons/solar-panel.tsx";

export type Icon = ComponentType<{
  readonly [x: string]: unknown;
  readonly size?: number;
  readonly color?: string;
  readonly stroke?: number;
}>;

export const IconBolt: Icon = IconBoltComponent;
export const IconBrandDeno: Icon = IconBrandDenoComponent;
export const IconBrandReact: Icon = IconBrandReactComponent;
export const IconBrandTailwind: Icon = IconBrandTailwindComponent;
export const IconChevronDown: Icon = IconChevronDownComponent;
export const IconLemon2: Icon = IconLemon2Component;
export const IconSolarPanel2: Icon = IconSolarPanel2Component;
export const IconSolarPanel: Icon = IconSolarPanelComponent;
