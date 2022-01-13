/**
 * Entrypoint for the application
 */

// import Buffer to allow for unbundled development with near-js-api
import { Buffer } from "buffer";
globalThis.Buffer = Buffer;
globalThis.global = globalThis;

import { createApp } from "vue";
import App from "./near-app/App.vue";
import { router } from "./router";
import { i18n } from "./i18n";
import "./index.css";

createApp(App).use(router).use(i18n).mount("#app");
