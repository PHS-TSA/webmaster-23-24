import { assertEquals, assertThrows } from "@std/assert";
import { ParseResult, Schema } from "effect";
import { SolutionPagesSchema } from "./solutions.ts";

/**
 * Test the solution pages schema.
 */
Deno.test("Solution pages schema.", async (t: Deno.TestContext): Promise<void> => {
  await t.step("Valid data", (): void => {
    const value = [
      {
        slug: "slug",
        data: {
          title: "",
          description: "",
          category: "",
          sectionHeader: "",
          heroImage: "/images/pic.avif",
          icon: "IconSolarPanel",
        },
      },
    ];

    const actual = Schema.decodeUnknownSync(SolutionPagesSchema)(value);
    assertEquals(actual, value);
  });

  await t.step("Invalid data", async (t): Promise<void> => {
    await t.step("Missing category", (): void => {
      const actual = () =>
        Schema.decodeUnknownSync(SolutionPagesSchema)([
          {
            data: {
              title: "title",
              description: "description",
            },
          },
        ]);
      assertThrows(actual, ParseResult.ParseError, "is missing");
    });
  });
});
