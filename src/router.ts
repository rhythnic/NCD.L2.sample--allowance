/**
 * Router
 * All routes should be children of the /:locale path
 */

import { createRouter, createWebHashHistory, RouteLocation } from "vue-router";
import Layout from "./views/layout/Layout.vue";
import HomeView from "./views/home/Home.vue";
import FundRegistryView from "./views/fund-registry/FundRegistry.vue";
import FundView from "./views/fund/Fund.vue";
import { supportedLocales } from "./providers/i18n/settings";
import { INITIAL_LOCALE } from "@/env/variables";
import { wallet } from "./providers/near/near-service";

const routes = [
  {
    name: "root",
    path: "/",
    redirect: `/${INITIAL_LOCALE}`,
  },
  {
    path: "/:locale",
    component: Layout,
    beforeEnter: (to: RouteLocation) => {
      if (!supportedLocales.includes(to.params.locale as string)) {
        return `/${INITIAL_LOCALE}`;
      }
    },
    children: [
      {
        name: "home",
        path: "",
        component: HomeView,
        beforeEnter: (to: RouteLocation) => {
          if (wallet.isSignedIn()) return { name: "funds", params: to.params };
        },
      },
      {
        name: "funds",
        path: "funds",
        props: true,
        component: FundRegistryView,
      },
      {
        name: "fund",
        path: "funds/:subaccount",
        props: true,
        component: FundView,
      },
    ],
  },
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const homePath = `/${to.params.locale}`;
  if (to.path !== homePath && !wallet.isSignedIn()) next({ path: homePath });
  else next();
});
