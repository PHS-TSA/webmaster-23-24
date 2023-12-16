import { Head } from "$fresh/runtime.ts";
import { Logo } from "../components/Logo.tsx";

export default function Error404() {
  return (
    <>
      <Head>
        <title>404 - Page not found | Why Switch?</title>
      </Head>
      <div class="px-4 py-8 mx-0 bg-green-400 dark:bg-green-600">
        <div class="max-w-screen-md mx-auto flex flex-col items-center justify-center">
          <Logo />
          <h1 class="text-4xl font-bold dark:text-white">
            404 - Page not found!
          </h1>
          <p class="my-4 dark:text-white">
            The page you were looking for doesn't exist.
          </p>
          <a href="/" class="underline">Go back home</a>
        </div>
      </div>
    </>
  );
}
