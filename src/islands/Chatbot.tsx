import { Transition } from "@headlessui/react";
import { signal, useSignal } from "@preact/signals";
import type { MessageContentText } from "openai/resources/beta/threads/messages/messages.ts";
import type { JSX, RenderableProps } from "preact";
import { useCallback } from "preact/hooks";
import { IconMessageChatbot } from "../utils/icons.ts";
import { tw } from "../utils/tailwind.ts";

const thread = signal<string | undefined>(undefined);
const messages = signal<MessageContentText[]>([]);

export function Chatbot(
  props: RenderableProps<JSX.HTMLAttributes<HTMLButtonElement>>,
): JSX.Element {
  const isOpen = useSignal(false);

  return (
    <button
      {...props}
      class={`flex size-14 flex-row items-center justify-center rounded-full bg-blue-400 dark:bg-blue-800 ${props.class}`}
      type="button"
      onClick={() => {
        isOpen.value = !isOpen.value;
      }}
    >
      <IconMessageChatbot class="size-8" />
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
          <div>
            <ChatbotBox class="absolute bottom-20 right-0" />
          </div>
        )}
      </Transition>
    </button>
  );
}

function ChatbotBox(props: JSX.HTMLAttributes<HTMLDivElement>): JSX.Element {
  const nextComment = useCallback(
    async (message: string) => {
      const response = await fetch(
        `/api/chat/?thread=${thread.value ?? ""}&q=${message}`,
      );
      const json = await response.json();
      thread.value ??= json;
      messages.value = [...messages.value, json.response];
    },
    [thread],
  );

  return (
    <div
      {...props}
      class={`dark:bg-blue-800 bg-blue-400 w-72 h-96 rounded-lg p-5 overflow-y-scroll ${props.class}`}
      onClick={async (e) => {
        e.stopPropagation();

        await nextComment("What is solar power?");
      }}
    >
      {messages.value.map((message) => {
        return (
          <div class="bg-slate-300 rounded dark:bg-slate-800 p-4 text-sm text-left">
            {message.text.value}
          </div>
        );
      })}
    </div>
  );
}
