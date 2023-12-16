import { Head } from "$fresh/runtime.ts";
import { Logo } from "../components/Logo.tsx";

export default function Home() {
  return (
    <>
      <Head>
        <title>Home | Why Switch?</title>
      </Head>
      <div class="px-4 py-8 mx-0 bg-green-400 dark:bg-green-600">
        <div class="max-w-screen-md mx-auto flex flex-col items-center justify-center">
          <Logo />
          <h1 class="text-4xl font-bold dark:text-white">Why Switch?</h1>
          <p class="my-4 dark:text-white">
            Looking for information about solar power? You've come to the right
            place!
          </p>
        </div>
      </div>
    </>
  );
}
