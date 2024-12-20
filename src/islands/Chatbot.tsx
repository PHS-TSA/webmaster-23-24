import { IS_BROWSER } from "$fresh/runtime.ts";
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
import { IconMessageChatbot, IconReload, IconSend } from "@tabler/icons-preact";
import { clsx } from "clsx";
import type { JSX } from "preact";
import { Fragment, Suspense, useEffect, useRef } from "preact/compat";
import { Loading } from "../components/Loading.tsx";
import {
  blueButtonStyles,
  floatingButtonStyles,
} from "../components/styles.ts";
import { chat } from "../sdk/chat/index.ts";
import { getThreadId } from "../sdk/chat/thread.ts";
import { setIndexedDb, useIndexedDb } from "../utils/hooks/indexeddb.ts";
import { formatRefs } from "../utils/openai/references.ts";
import type { Message } from "../utils/openai/schemas.ts";
import { tw } from "../utils/tags.ts";
import { Markdown } from "./Markdown.tsx";

export function Chatbot(): JSX.Element {
  const icon = <IconMessageChatbot class="size-8" />;
  const buttonStyles = clsx(floatingButtonStyles, blueButtonStyles);

  if (!IS_BROWSER) {
    return (
      <button type="button" class={buttonStyles}>
        {icon}
      </button>
    );
  }

  return (
    <Popover>
      <PopoverButton className={buttonStyles} aria-label="Meet our Chatbot!">
        {icon}
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

  const thread_ = useIndexedDb("thread", getThreadId);
  const threadId = useSignal(thread_);
  useSignalEffect(() => {
    (async () => {
      await setIndexedDb("thread", threadId.value);
    })();
  });

  const messages_ = useIndexedDb<Db>(
    "messages",
    // deno-lint-ignore require-await
    async () => [],
  );
  const messages = useSignal(messages_ ?? []);
  useSignalEffect(() => {
    (async () => {
      await setIndexedDb("messages", messages.value);
    })();
  });

  const scrollRef = useRef<HTMLUListElement>(null);
  // biome-ignore lint/correctness/useExhaustiveDependencies: It depends on it indirectly.
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 9999999 });
  }, [messages.value]);

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
          title="Powered by OpenAI's GPT-4o!"
          src="/images/openai.avif"
          class="inline rounded-full text-center align-middle size-6"
          height={200}
          width={200}
        />{" "}
        Why Switch?
        <div
          class="relative -right-1 -top-2 inline-block size-2 rounded-full bg-green-500 ring-1 ring-slate-50 dark:ring-slate-950"
          title="GPT-4o is online!"
        />
        <Button
          class="float-end"
          title="Restart your conversation."
          onClick={async () => {
            threadId.value = await getThreadId();
            messages.value = [];
          }}
        >
          <IconReload />
        </Button>
      </div>
      <ul ref={scrollRef} class="flex flex-col-reverse gap-4 overflow-y-auto">
        {isAsking.value && (
          <li class={replyStyles}>
            <Loading />
          </li>
        )}{" "}
        {messages.value.map((msg) => (
          <li
            key={`${msg.role}${msg.message}`}
            class={clsx(getReplySide(msg.role), replyStyles)}
          >
            <Markdown>{msg.message}</Markdown>
          </li>
        ))}
      </ul>

      <form
        class="py-2 place-items-center"
        onSubmit={async (e) => {
          e.preventDefault();

          if (threadId.value === undefined) {
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

          const reply = await chat(threadId.value, message);

          if (reply === undefined) {
            // Don't crash when offline.
            return;
          }

          messages.value = await Promise.all(
            reply.map(
              async (val: Message): Promise<DbItem> => ({
                role: val.role,
                message: await formatRefs(val),
              }),
            ),
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
            title="Send your message."
          >
            <IconSend class="dark:text-slate-950" />
          </Button>
        </Fieldset>
      </form>
    </div>
  );
}
