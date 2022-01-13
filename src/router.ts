/**
 * Router
 * Route guards are done in the components, where there is access to providers
 * All routes should be children of the /:locale path
 */

import { createRouter, createWebHashHistory, RouteLocation } from "vue-router";
import LocaleContainer from "./views/locale/LocaleContainer.vue";
import HomeView from "./views/home/Home.vue";
import FundRegistryView from "./views/fund-registry/FundRegistry.vue";
import FundView from "./views/fund/Fund.vue";
import { INITIAL_LOCALE, supportedLocales } from "./i18n";

const routes = [
  {
    name: "root",
    path: "/",
    redirect: `/${INITIAL_LOCALE}`,
  },
  {
    path: "/:locale",
    component: LocaleContainer,
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
      },
      {
        name: "funds",
        path: "funds",
        component: FundRegistryView,
      },
      {
        name: "fund",
        path: "funds/:subaccount",
        component: FundView,
      },
    ],
  },
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
