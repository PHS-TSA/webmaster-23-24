import { Transition } from "@headlessui/react";
import { useSignal } from "@preact/signals";
import type { JSX, RenderableProps } from "preact";
import { Suspense } from "preact/compat";
import { useEffect, useId, useMemo } from "preact/hooks";
import { Loading } from "../components/Loading.tsx";
import { useChat } from "../sdk/chat/index.ts";
import { IconMessageChatbot } from "../utils/icons.ts";
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
        {isOpen.value && <ChatbotBox class="absolute bottom-20 right-0" />}
      </Transition>
    </div>
  );
}

function ChatbotBox(props: JSX.HTMLAttributes<HTMLDivElement>): JSX.Element {
  const messageValue = useSignal("");
  const inputId = useId();
  const messages = useSignal<string[]>([]);

  return (
    <div
      {...props}
      class={`dark:bg-blue-800 bg-blue-400 w-72 h-96 rounded-lg p-5 overflow-y-scroll grid place-items-center ${props.class}`}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      {messages.value.map((message) => (
        <div key={message}>
          <Suspense fallback={<Loading />}>
            <div>
              <ChatResponse key={message} message={message} />
            </div>
          </Suspense>
        </div>
      ))}
      <form
        onSubmit={(e) => {
          e.preventDefault();

          messages.value = [...messages.value, messageValue.value];
        }}
      >
        <label for={inputId}>Ask A Question, Any Question!</label>
        <input
          id={inputId}
          value={messageValue.value}
          autoComplete="off"
          onInput={(e) => {
            messageValue.value = (e.target as HTMLInputElement).value;
          }}
        />
      </form>
    </div>
  );
}

function ChatResponse({ message }: { message: string }): JSX.Element {
  const thread = useSignal<string | undefined>(undefined);
  const json = useChat(message, thread.value);
  const data = useMemo(() => json?.response.text.value, [json]);

  useEffect(() => {
    thread.value ??= json?.thread_id;
  }, [json]);

  return (
    <div class="bg-slate-300 rounded dark:bg-slate-800 p-4 text-sm text-left">
      {data}
    </div>
  );
}
