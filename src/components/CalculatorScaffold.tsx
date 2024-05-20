import type { ComponentChildren, JSX } from "preact";

interface CalculatorScaffoldProps {
  readonly children: ComponentChildren;
}

export default function CalculatorScaffold({
  children,
}: CalculatorScaffoldProps): JSX.Element {
  return (
    <main class="flex flex-col bg-slate-200 p-16 dark:bg-slate-800 place-items-center">
      <span class="p-5 text-lg">
        Calculate and compare the pricing for solar and geothermal.
      </span>
      {children}
    </main>
  );
}
