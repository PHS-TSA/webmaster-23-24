import type { JSX } from "preact";

export function Loading(): JSX.Element {
  return (
    <div class="grid place-items-center w-24">
      <div class="loader" />
    </div>
  );
}
