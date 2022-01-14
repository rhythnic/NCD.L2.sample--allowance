<!--
  Layout
  Layout is rendered by the main App component at src/near-app/App.vue
  Layout watches the route and redirects to /home if the user is not signed in
-->

<script setup lang="ts">
  import { inject } from "vue";
  import {
    onBeforeRouteUpdate,
    RouteLocationNormalized,
    useRoute,
    useRouter,
  } from "vue-router";
  import { Wallet } from "@/models/interfaces";
  import Header from "./Header.vue";

  const wallet = inject("wallet") as Wallet;

  const router = useRouter();
  const route = useRoute();

  redirectUnauthorizedUsers(route);
  onBeforeRouteUpdate(redirectUnauthorizedUsers);

  function redirectUnauthorizedUsers(to: RouteLocationNormalized) {
    const homePath = `/${to.params.locale}`;
    if (to.path !== homePath && !wallet.isSignedIn()) {
      router.replace({ path: homePath });
    }
  }
</script>

<template>
  <Header />
  <main class="grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <router-view></router-view>
  </main>
</template>
