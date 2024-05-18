import IconAlertTriangleComponent from "$tabler_icons/alert-triangle.tsx";
import IconBoltComponent from "$tabler_icons/bolt.tsx";
import IconBrandDenoComponent from "$tabler_icons/brand-deno.tsx";
import IconBrandReactComponent from "$tabler_icons/brand-react.tsx";
import IconBrandTailwindComponent from "$tabler_icons/brand-tailwind.tsx";
import IconCheckComponent from "$tabler_icons/check.tsx";
import IconChevronDownComponent from "$tabler_icons/chevron-down.tsx";
import IconChevronUpComponent from "$tabler_icons/chevron-up.tsx";
import IconFlameComponent from "$tabler_icons/flame.tsx";
import IconInfoCircleComponent from "$tabler_icons/info-circle.tsx";
import IconLemon2Component from "$tabler_icons/lemon-2.tsx";
import IconLinkComponent from "$tabler_icons/link.tsx";
import IconMessageChatbotComponent from "$tabler_icons/message-chatbot.tsx";
import IconSendComponent from "$tabler_icons/send.tsx";
import IconSolarPanel2Component from "$tabler_icons/solar-panel-2.tsx";
import IconSolarPanelComponent from "$tabler_icons/solar-panel.tsx";
import type { ComponentType } from "preact";

/**
 * An icon component, which is a function that returns a preact component.
 */
export type Icon = ComponentType<{
  readonly [x: string]: unknown;
  readonly size?: number;
  readonly color?: string;
  readonly stroke?: number;
}>;

/**
 * The Deno logo.
 */
export const IconBrandDeno: Icon = IconBrandDenoComponent;

/**
 * The React logo.
 * Pretend it's Preact.
 */
export const IconBrandReact: Icon = IconBrandReactComponent;

/**
 * The Tailwind logo.
 */
export const IconBrandTailwind: Icon = IconBrandTailwindComponent;

/**
 * An icon of a chevron pointing down.
 */
export const IconChevronDown: Icon = IconChevronDownComponent;

/**
 * An icon of a chevron pointing up.
 */
export const IconChevronUp: Icon = IconChevronUpComponent;

/**
 * A lemon icon.
 */
export const IconLemon2: Icon = IconLemon2Component;

/**
 * A solar panel icon.
 * This is the main icon used for the website.
 * It has no base, but does show the sun.
 */
export const IconSolarPanel2: Icon = IconSolarPanel2Component;

/**
 * A solar panel icon.
 * This one has a base.
 *
 * @see {@link IconSolarPanel2}
 */
export const IconSolarPanel: Icon = IconSolarPanelComponent;

/**
 * A bolt icon.
 */
export const IconBolt: Icon = IconBoltComponent;

/**
 * An info circle icon.
 */
export const IconInfoCircle: Icon = IconInfoCircleComponent;

/**
 * An alert triangle icon.
 */
export const IconAlertTriangle: Icon = IconAlertTriangleComponent;

/**
 * An info flame icon.
 */
export const IconFlame: Icon = IconFlameComponent;

/**
 * An icon of a checkmark.
 */
export const IconCheck: Icon = IconCheckComponent;

/**
 * An anchor link icon.
 */
export const IconLink: Icon = IconLinkComponent;

/**
 * A chatbot icon.
 *
 * It's a smiling robot!
 */
export const IconMessageChatbot: Icon = IconMessageChatbotComponent;

/**
 * A send icon.
 *
 * It's a paper airplaneQ
 */
export const IconSend: Icon = IconSendComponent;
