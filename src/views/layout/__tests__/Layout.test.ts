import { nextTick } from "vue";
import { fireEvent } from "@testing-library/vue";
import { createRouter, createWebHashHistory, Router } from 'vue-router';
import Layout from "../Layout.vue";
import { renderView, mockWallet, contractId } from '@/test-helpers';

jest.mock("@/env/variables");

const locale = 'en-US';
const accountId = "ACCOUNT_ID";

const App = {
  name: 'app',
  template: '<router-view></router-view>'
}

const EmptyComponent = {
  name: 'home',
  template: '<div></div>'
}

const routes = [
  { path: '/', redirect: `/${locale}` },
  {
    path: '/:locale',
    component: Layout,
    children: [
      { name: 'home', path: '', component: EmptyComponent },
      { name: 'learn', path: 'learn', component: EmptyComponent }
    ]
  },
]

function renderLayout(plugins: any[], provide: any) {
  return renderView(App, { global: { plugins, provide } });
}

describe('layout/Layout.vue', () => {
  let router: Router;

  beforeEach(async () => {
    router = createRouter({
      history: createWebHashHistory(),
      routes,
    });
  
    router.push('/en-US');
    await router.isReady();
  })


  test("sign in", async () => {
    const wallet = mockWallet();

    const { getByTestId } = renderLayout([router], { wallet });
  
    await fireEvent.click(getByTestId('signInDesktop'));
    
    expect(wallet.requestSignIn).toHaveBeenCalledWith({ contractId });
  });

  test("sign out", async () => {
    const wallet = mockWallet(accountId);
    const routerPush = jest.fn(router.push.bind(router))
    router.push = routerPush;

    const { getByText, getByTestId } = renderLayout([router], { wallet });
  
    await fireEvent.click(getByText(accountId));
    await fireEvent.click(getByTestId("signOutDesktop"));
    
    expect(wallet.signOut).toHaveBeenCalled();
    expect(routerPush).toHaveBeenCalled();
  });

  test("select locale", async () => {
    const wallet = mockWallet(accountId);
    const routerPush = jest.fn(router.push.bind(router))
    router.push = routerPush;

    const { getByText } = renderLayout([router], { wallet });

    await fireEvent.click(getByText('English'));
    await fireEvent.click(getByText("한국어"));

    expect(routerPush.mock.calls[0]).toEqual([{ name: 'home', params: { locale: 'ko' } }]);
  });

  test('transaction complete alert', async () => {
    const wallet = mockWallet(accountId);
    // see providers/components/NearTransactionDetector for explanaition on using window.history
    window.history.replaceState({}, document.title, "?transactionHashes=8Gwv4YjhydnWGViLKT5EBv6dp37wo51WY3iYBRm3w1rJ/#en-US");

    const { getByText } = renderLayout([router], { wallet });
    await nextTick();
    getByText('Transaction Succeeded');
  })
});