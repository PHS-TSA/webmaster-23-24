import { assertEquals, assertThrows } from "@std/assert";
import { ZodError } from "zod";
import { solutionPagesSchema } from "./solutions.ts";

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
        },
      },
    ];

    const actual = solutionPagesSchema.parse(value);
    assertEquals(actual, value);
  });

  await t.step("Invalid data", async (t): Promise<void> => {
    await t.step("Empty", (): void => {
      const actual = (): void => {
        solutionPagesSchema.parse([{}]);
      };
      assertThrows(actual, Error, "Required");
    });
    await t.step("Missing category", (): void => {
      const actual = (): void => {
        solutionPagesSchema.parse([
          {
            data: {
              title: "title",
              description: "description",
            },
          },
        ]);
      };
      assertThrows(actual, ZodError, "Required");
    });
  });
});
