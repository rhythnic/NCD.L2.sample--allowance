import { createRouter, createWebHashHistory, RouteLocation } from "vue-router";
import { useAuthState } from "./composables/auth";
import LocaleContainer from "./views/locale/LocaleContainer.vue";
import HomeView from "./views/home/Home.vue";
import FundRegistryView from "./views/fund-registry/FundRegistry.vue";
import FundView from "./views/fund/Fund.vue";
import { INITIAL_LOCALE, supportedLocales } from "./i18n";

const { isSignedIn } = useAuthState();

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
        beforeEnter: (to: RouteLocation) =>
          isSignedIn.value ? `/${to.params.locale}/funds` : true,
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

router.beforeEach((to, from, next) => {
  const homePath = `/${to.params.locale}`;
  if (to.path !== homePath && !isSignedIn.value) next({ path: homePath });
  else next();
});
