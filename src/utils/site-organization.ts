import { z } from "zod";

// TODO(lishaduck): generate from  `solutions`.
export const menus = [
  {
    title: "Going Green?",
    url: "/green/",
    items: [
      { name: "Getting Started", href: "getting-started/" },
      { name: "Programs", href: "programs/" },
    ],
  },
  {
    title: "Monies",
    url: "/monies/",
    items: [
      { name: "Taxes", href: "guarantees-in-life/" },
      { name: "Pricing", href: "pricing/" },
    ],
  },
  {
    title: "About",
    url: "/about/",
  },
] as const;

export type MenuProps = z.infer<typeof menuPropsTypeSchema>;
export type MenuPropsRequired = z.infer<typeof menuPropsSchemaRequired>;
export type MenuItem = z.infer<typeof menuItemSchema>;

const menuItemSchema = z
  .object({
    href: z.custom<`${string}/`>(
      (val) => z.string().regex(/.*\/$/).safeParse(val).success,
    ),
    name: z.string(),
  })
  .readonly();

/**
 * Checks if the menu has items.
 *
 * Always call `.readonly()`!
 * It has to go last, and this allows customizing it before doing so.
 *
 * @param menu The menu to check.
 * @returns True if the menu has items, false otherwise.
 */
export const menuPropsSchema = z.object({
  title: z.string(),
  active: z.boolean(),
  items: menuItemSchema.array().readonly().optional(),
  url: z.custom<`${string}/`>(
    (val) =>
      z
        .string()
        .regex(/^\/.*\/$/)
        .safeParse(val).success,
  ),
});

/**
 * A variant with `.required().readonly()` appended.
 */
export const menuPropsSchemaRequired = menuPropsSchema.required().readonly();

/**
 * Types can't call functions, so this const has to be made.
 *
 * Unlike the `-required` variant, this only `.readonly()`s.
 */
const menuPropsTypeSchema = menuPropsSchema.readonly();
