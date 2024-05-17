import { IS_BROWSER } from "$fresh/runtime.ts";
import { render } from "$gfm";
import {
  Button,
  Fieldset,
  Input,
  Label,
  Popover,
  PopoverButton,
  PopoverPanel,
  Transition,
} from "@headlessui/react";
import { useSignal, useSignalEffect } from "@preact/signals";
import { clsx } from "clsx";
import { set } from "idb-keyval";
import type { JSX } from "preact";
import { Fragment, Suspense } from "preact/compat";
import { Loading } from "../components/Loading.tsx";
import { floatingButtonStyles } from "../components/styles.ts";
import { chat } from "../sdk/chat/index.ts";
import { getThread } from "../sdk/chat/thread.ts";
import { useIndexedDB } from "../utils/hooks/indexeddb.ts";
import { IconMessageChatbot } from "../utils/icons.ts";
import { IconSend } from "../utils/icons.ts";
import { formatRefs } from "../utils/openai/references.ts";
import type { Message } from "../utils/openai/schemas.ts";
import { tw } from "../utils/tailwind.ts";

export interface ChatbotProps {
  readonly class: string;
}

export function Chatbot(props: ChatbotProps): JSX.Element {
  if (!IS_BROWSER) {
    return (
      <div class={clsx(floatingButtonStyles, props.class)}>
        <IconMessageChatbot class="size-8" />
      </div>
    );
  }

  return (
    <Popover className={props.class}>
      <PopoverButton
        className={floatingButtonStyles}
        aria-label="Meet our Chatbot!"
      >
        <IconMessageChatbot class="size-8" />
      </PopoverButton>
      <Transition
        appear={true}
        enter={tw`transition-opacity duration-75`}
        enterFrom={tw`opacity-0`}
        enterTo={tw`opacity-100`}
        leave={tw`transition-opacity duration-150`}
        leaveFrom={tw`opacity-100`}
        leaveTo={tw`opacity-0`}
      >
        <PopoverPanel>
          <Suspense fallback={<Fragment />}>
            <ChatbotBox class="absolute bottom-20 right-0 shadow-2xl" />
          </Suspense>
        </PopoverPanel>
      </Transition>
    </Popover>
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
      class={clsx(
        "dark:bg-blue-800 bg-blue-400 w-[90vw] sm:w-80 h-96 rounded-lg p-5 grid grid-flow-row auto-rows-min grid-rows-message-box",
        props.class,
      )}
    >
      <div class="h-8 text-lg font-mono">
        <img
          alt=""
          src="/images/openai.avif"
          class="inline rounded-full text-center align-middle"
          height={24}
          width={24}
        />{" "}
        Why Switch?
        <div
          class="relative -right-1 -top-2 inline-block size-2 rounded-full bg-green-500 ring-1 ring-slate-50 dark:ring-slate-950"
          title="GPT-4o is online!"
        />
      </div>
      <ul class="flex flex-col-reverse gap-4 overflow-y-auto fade-list">
        {isAsking.value && (
          <li class={replyStyles}>
            <Loading />
          </li>
        )}
        {messages.value.map((msg) => (
          <li
            key={`${msg.role}${msg.message}`}
            class={clsx(getReplySide(msg.role), replyStyles)}
            // biome-ignore lint/security/noDangerouslySetInnerHtml: It's back!
            dangerouslySetInnerHTML={{ __html: render(msg.message) }}
          />
        ))}
      </ul>

      <form
        class="py-2 place-items-center"
        onSubmit={async (e) => {
          // TODO(lishaduck): Enable moderation.

          e.preventDefault();

          if (thread === undefined) {
            throw new Error("Why didn't we Suspend-se before now?");
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
          <Label>Ask A Question, Any Question!</Label>
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
