import { Buffer } from "buffer";
globalThis.Buffer = Buffer;
globalThis.global = globalThis;

import { createApp, h } from "vue";
import App from "./near-app/App.vue";
import { router } from "./router";
import { i18n } from "./i18n";
import "./index.css";

createApp(App).use(router).use(i18n).mount("#app");
