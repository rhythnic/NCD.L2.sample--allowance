/**
 * Entrypoint for the application
 */

// import Buffer to allow for unbundled development with near-js-api
import { Buffer } from "buffer";
globalThis.Buffer = Buffer;
globalThis.global = globalThis;

import { createApp } from "vue";
import App from "./App.vue";
import { router } from "./router";
import { createI18n } from "vue-i18n";
import { vueI18nOptions } from "./providers/i18n/settings";
import "./index.css";

createApp(App).use(router).use(createI18n(vueI18nOptions)).mount("#app");
