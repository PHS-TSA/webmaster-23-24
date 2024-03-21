import { render } from "$gfm";
import { Transition } from "@headlessui/react";
import { useSignal, useSignalEffect } from "@preact/signals";
import { set } from "idb-keyval";
import type { TextContentBlock } from "openai/resources/beta/threads/messages/messages.ts";
import type { JSX, RenderableProps } from "preact";
import { Suspense } from "preact/compat";
import { useId } from "preact/hooks";
import { Loading } from "../components/Loading.tsx";
import { chat } from "../sdk/chat/index.ts";
import { IconMessageChatbot } from "../utils/icons.ts";
import { IconSend } from "../utils/icons.ts";
import { useIndexedDB } from "../utils/indexeddb.ts";
import { tw } from "../utils/tailwind.ts";

export function Chatbot(
  props: RenderableProps<JSX.HTMLAttributes<HTMLDivElement>>,
): JSX.Element {
  const isOpen = useSignal(false);

  return (
    <div {...props} class={props.class}>
      <button
        class="flex size-14 flex-row items-center justify-center rounded-full bg-blue-400 dark:bg-blue-800"
        onClick={() => {
          isOpen.value = !isOpen.value;
        }}
        type="button"
        aria-label="Meet our Chatbot!"
      >
        <IconMessageChatbot class="size-8" />
      </button>
      <Transition
        appear={true}
        show={isOpen.value}
        enter={tw`transition-opacity duration-75`}
        enterFrom={tw`opacity-0`}
        enterTo={tw`opacity-100`}
        leave={tw`transition-opacity duration-150`}
        leaveFrom={tw`opacity-100`}
        leaveTo={tw`opacity-0`}
      >
        {isOpen.value && (
          // biome-ignore lint/complexity/noUselessFragments: It's necessary.
          <Suspense fallback={<></>}>
            <ChatbotBox class="absolute bottom-20 right-0" />
          </Suspense>
        )}
      </Transition>
    </div>
  );
}

const replyStyles = tw`bg-slate-300 rounded-lg dark:bg-slate-800 p-4 prose prose-slate prose-sm dark:prose-invert max-w-80 sm:max-w-40`;

function getReplySide(role: "assistant" | "user"): string {
  switch (role) {
    case "assistant":
      return tw`text-start mr-auto`;

    case "user":
      return tw`text-end ml-auto`;
  }
}

function ChatbotBox(props: JSX.HTMLAttributes<HTMLDivElement>): JSX.Element {
  const messageValue = useSignal("");
  const inputId = useId();
  const isAsking = useSignal(false);
  const thread = useIndexedDB<string | undefined>(
    "thread",
    [],
    async () => (await (await fetch("/api/chat/thread/")).json()).thread_id,
  );

  const messages_ = useIndexedDB<
    { role: "assistant" | "user"; message: string }[]
  >(
    "messages",
    [],
    // deno-lint-ignore require-await
    async () => [],
  );
  const messages = useSignal(messages_ ?? []);
  useSignalEffect(() => {
    set("messages", messages.value);
  });

  return (
    <div
      {...props}
      class={`dark:bg-blue-800 bg-blue-400 w-[90vw] sm:w-72 h-96 rounded-lg p-5 grid grid-flow-row auto-rows-min grid-rows-message-box ${props.class}`}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <div class="flex flex-col-reverse gap-4 overflow-y-auto">
        {isAsking.value && (
          <div class={replyStyles}>
            <Loading />
          </div>
        )}
        {messages.value.map((msg) => (
          <div
            key={msg.message}
            class={`${getReplySide(msg.role)} ${replyStyles}`}
            // biome-ignore lint/security/noDangerouslySetInnerHtml: It's back!
            dangerouslySetInnerHTML={{ __html: render(msg.message, {}) }}
          />
        ))}
      </div>

      <form
        class="py-2 place-items-center"
        onSubmit={async (e) => {
          e.preventDefault();

          if (thread === undefined) {
            throw new Error("Why didn't we suspend before now?");
          }

          const message = messageValue.value;
          if (message === "") {
            // If there's no message, don't do anything.
            return;
          }
          messageValue.value = "";
          isAsking.value = true;
          messages.value = [{ role: "user", message }, ...messages.value];

          const reply = await chat(thread, message);

          if (reply === undefined) {
            // Don't crash when offline.
            return;
          }

          messages.value = reply.map((val) => {
            return {
              role: val.role,
              message: val.content
                .filter(
                  (val2): val2 is TextContentBlock => val2.type === "text",
                )
                .map((val2) => val2.text.value)
                .join(" "),
            };
          });

          isAsking.value = false;
        }}
      >
        <label for={inputId}>Ask A Question, Any Question!</label>
        <div class="relative">
          <input
            id={inputId}
            value={messageValue.value}
            autoComplete="off"
            class="pr-10 w-full rounded-sm dark:text-slate-950 whitespace-normal"
            onInput={(e) => {
              messageValue.value = (e.target as HTMLInputElement).value;
            }}
          />
          <button
            class="absolute right-2 top-0 p-2"
            type="submit"
            aria-label="Send"
          >
            <IconSend class="dark:text-slate-950" />
          </button>
        </div>
      </form>
    </div>
  );
}
