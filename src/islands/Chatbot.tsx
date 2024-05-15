import { IS_BROWSER } from "$fresh/runtime.ts";
import { render } from "@deno/gfm";
import { Button, Fieldset, Input } from "@headlessui/react";
import { useSignal, useSignalEffect } from "@preact/signals";
import { clsx } from "clsx";
import { set } from "idb-keyval";
import type { JSX, RenderableProps } from "preact";
import { Fragment } from "preact";
import { Suspense } from "preact/compat";
import { Loading } from "../components/Loading.tsx";
import { chat } from "../sdk/chat/index.ts";
import { getThread } from "../sdk/chat/thread.ts";
import { IconMessageChatbot } from "../utils/icons.ts";
import { IconSend } from "../utils/icons.ts";
import { useIndexedDB } from "../utils/indexeddb.ts";
import { formatRefs } from "../utils/openai/references.ts";
import type { Message } from "../utils/openai/schemas.ts";
import { tw } from "../utils/tailwind.ts";

export function Chatbot(
  props: RenderableProps<JSX.HTMLAttributes<HTMLDivElement>>,
): JSX.Element {
  const isOpen = useSignal(false);

  if (!IS_BROWSER) {
    return <></>;
  }

  return (
    <div {...props} class={props.class}>
      <Button
        className="flex size-14 flex-row items-center justify-center rounded-full bg-blue-400 dark:bg-blue-800 shadow-2xl"
        onClick={() => {
          isOpen.value = !isOpen.value;
        }}
        type="button"
        aria-label="Meet our Chatbot!"
      >
        <IconMessageChatbot class="size-8" />
      </Button>

      {isOpen.value && (
        <Suspense fallback={<Fragment />}>
          {/* <Transition
            appear={true}
            show={isOpen.value}
            enter={tw`transition-opacity duration-75`}
            enterFrom={tw`opacity-0`}
            enterTo={tw`opacity-100`}
            leave={tw`transition-opacity duration-150`}
            leaveFrom={tw`opacity-100`}
            leaveTo={tw`opacity-0`}
          > */}
          <ChatbotBox class="absolute bottom-20 right-0 shadow-2xl" />
          {/* </Transition> */}
        </Suspense>
      )}
    </div>
  );
}

const replyStyles = tw`prose prose-sm prose-slate rounded-lg max-w-60 bg-slate-300 p-4 dark:prose-invert dark:bg-slate-800`;

function getReplySide(role: "assistant" | "user"): string {
  switch (role) {
    case "assistant":
      return tw`mr-auto text-start`;

    case "user":
      return tw`ml-auto text-end`;
  }
}

type DbItem = { role: "assistant" | "user"; message: string };
type Db = DbItem[];

function ChatbotBox(props: JSX.HTMLAttributes<HTMLDivElement>): JSX.Element {
  const messageValue = useSignal("");
  const isAsking = useSignal(false);
  const thread = useIndexedDB<string>(
    "thread",
    async () => (await getThread())?.id,
  );

  const messages_ = useIndexedDB<Db>(
    "messages",
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
      class={`dark:bg-blue-800 bg-blue-400 w-[90vw] sm:w-80 h-96 rounded-lg p-5 grid grid-flow-row auto-rows-min grid-rows-message-box ${props.class}`}
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
            key={`${msg.role}${msg.message}`}
            class={clsx(getReplySide(msg.role), replyStyles)}
            // biome-ignore lint/security/noDangerouslySetInnerHtml: It's back!
            dangerouslySetInnerHTML={{ __html: render(msg.message) }}
          />
        ))}
      </div>

      <form
        class="py-2 place-items-center"
        onSubmit={async (e) => {
          // TODO(lishaduck): enable moderation

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

          messages.value = await Promise.all(
            reply.map(async (val: Message): Promise<DbItem> => {
              return {
                role: val.role,
                message: await formatRefs(val),
              };
            }),
          );

          isAsking.value = false;
        }}
      >
        <Fieldset disabled={!IS_BROWSER} class="relative">
          <label>Ask A Question, Any Question!</label>
          <Input
            value={messageValue.value}
            autoComplete="off"
            className="w-full whitespace-normal rounded-lg pr-10 shadow-sm dark:text-slate-950"
            onInput={(e: JSX.TargetedInputEvent<HTMLInputElement>) => {
              messageValue.value = (e.target as HTMLInputElement).value;
            }}
          />
          <Button
            className="absolute right-2 p-2"
            type="submit"
            aria-label="Send"
          >
            <IconSend class="dark:text-slate-950" />
          </Button>
        </Fieldset>
      </form>
    </div>
  );
}
