import { Buffer } from "buffer";
globalThis.Buffer = Buffer;

import { createApp, h } from "vue";
import Layout from "./views/layout/Layout.vue";
import { router } from "./router";
import { i18n } from "./i18n";
import "./index.css";

createApp(Layout).use(router).use(i18n).mount("#app");
