import { Logo } from "../components/Logo.tsx";

export default function Home() {
  return (
    <div class="px-4 py-8 mx-auto bg-[#86efac]">
      <div class="max-w-screen-md mx-auto flex flex-col items-center justify-center">
        <Logo />
        <h1 class="text-4xl font-bold">Why Switch?</h1>
        <p class="my-4">
          Looking for information about solar power? You've come to the right
          place!
        </p>
      </div>
    </div>
  );
}
