import { Head } from "$fresh/runtime.ts";
import { Logo } from "../components/Logo.tsx";

export default function About() {
  return (
    <>
      <Head>
        <title>About | Why Switch?</title>
      </Head>
      <div class="px-4 py-8 mx-0 bg-green-400">
        <div class="max-w-screen-md mx-auto flex flex-col items-center justify-center">
          <Logo />
          <h1 class="text-4xl font-bold">About</h1>
          <p class="my-4">
            It's us, man!
          </p>
        </div>
      </div>
    </>
  );
}
