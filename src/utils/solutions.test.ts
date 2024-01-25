import { assertEquals, assertThrows } from "$std/assert/mod.ts";
import { solutionPagesSchema } from "./solutions.ts";

/**
 * Test the solution pages schema.
 */
Deno.test(
  "Solution pages schema.",
  async (t: Deno.TestContext): Promise<void> => {
    await t.step("Valid data", (): void => {
      const value = [
        {
          slug: "slug",
          data: {
            title: "title",
            description: "description",
            category: "category",
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
      await t.step("Missing slug", (): void => {
        const actual = (): void => {
          solutionPagesSchema.parse([
            {
              data: {
                title: "title",
                description: "description",
                category: "category",
              },
            },
          ]);
        };
        assertThrows(actual, Error, "Required");
      });
    });
  },
);
