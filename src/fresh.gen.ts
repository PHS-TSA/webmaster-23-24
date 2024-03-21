// DO NOT EDIT. This file is generated by Fresh.
// This file SHOULD be checked into source version control.
// This file is automatically updated during development when running `dev.ts`.

import * as $_404 from "./routes/_404.tsx";
import * as $_500 from "./routes/_500.tsx";
import * as $_app from "./routes/_app.tsx";
import * as $_layout from "./routes/_layout.tsx";
import * as $about from "./routes/about.tsx";
import * as $api_chat_index from "./routes/api/chat/index.ts";
import * as $api_chat_thread from "./routes/api/chat/thread.ts";
import * as $calculator from "./routes/calculator.tsx";
import * as $index from "./routes/index.tsx";
import * as $solutions_category_slug_ from "./routes/solutions/[category]/[[slug]].tsx";
import * as $solutions_category_index from "./routes/solutions/[category]/index.tsx";
import * as $Chatbot from "./islands/Chatbot.tsx";
import * as $HeaderMenu from "./islands/HeaderMenu.tsx";
import * as $Selector from "./islands/Selector.tsx";
import { type Manifest } from "$fresh/server.ts";

const manifest = {
  routes: {
    "./routes/_404.tsx": $_404,
    "./routes/_500.tsx": $_500,
    "./routes/_app.tsx": $_app,
    "./routes/_layout.tsx": $_layout,
    "./routes/about.tsx": $about,
    "./routes/api/chat/index.ts": $api_chat_index,
    "./routes/api/chat/thread.ts": $api_chat_thread,
    "./routes/calculator.tsx": $calculator,
    "./routes/index.tsx": $index,
    "./routes/solutions/[category]/[[slug]].tsx": $solutions_category_slug_,
    "./routes/solutions/[category]/index.tsx": $solutions_category_index,
  },
  islands: {
    "./islands/Chatbot.tsx": $Chatbot,
    "./islands/HeaderMenu.tsx": $HeaderMenu,
    "./islands/Selector.tsx": $Selector,
  },
  baseUrl: import.meta.url,
} satisfies Manifest;

export default manifest;
