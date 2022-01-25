import { Component } from "vue";
import { render, RenderOptions } from "@testing-library/vue";
import { createI18n } from 'vue-i18n'
import { vueI18nOptions } from '@/providers/i18n/settings';

export const contractId = 'unittest.testnet'

export function mockWallet (accountId = '') {
  return {
    requestSignIn: accountId ? null : jest.fn(),
    getAccountId: () => accountId,
    isSignedIn: () => !!accountId,
    signOut: accountId ? jest.fn() : null
  }
}

export function renderView(component: Component, opts: RenderOptions = {}) {
  return render(component, {
    ...opts,
    global: {
      plugins: [...(opts.global?.plugins || []), createI18n(vueI18nOptions)],
      provide: { ...(opts.global?.provide || {}), contractId }
    },
  });
}