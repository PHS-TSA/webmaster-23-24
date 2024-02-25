import { assertEquals } from "$std/assert/mod.ts";
import { tw } from "./tailwind.ts";

/**
 * Tests for the tailwind template tag utility.
 */
Deno.test("Tailwind utility.", async (t: Deno.TestContext): Promise<void> => {
  await t.step("Actual Tailwind", (): void => {
    const actual = tw`text-center`;
    const expected = "text-center";
    assertEquals(actual, expected);
  });

  await t.step("Embedded inside a template string", (): void => {
    const actual = `a ${tw`string`}!`;
    const expected = "a string!";
    assertEquals(actual, expected);
  });

  await t.step("Dully embedded inside a template string", (): void => {
    const actual = `a ${tw`string${tw`bean`}`}!`;
    const expected = "a stringbean!";
    assertEquals(actual, expected);
  });

  await t.step("Embedded string", (): void => {
    const actual = tw`a ${"string"}.`;
    const expected = "a string.";
    assertEquals(actual, expected);
  });

  await t.step("Embedded tag", (): void => {
    const actual = tw`a ${tw`string`}.`;
    const expected = "a string.";
    assertEquals(actual, expected);
  });

  // WHY do we care!?
  await t.step("Special characters", (): void => {
    const actual = tw`\n`;
    const expected = "\n";
    assertEquals(actual, expected);
  });
});
