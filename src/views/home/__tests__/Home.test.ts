import { fireEvent } from "@testing-library/vue";
import Home from "../Home.vue";
import { renderView, mockWallet, contractId } from '@/test-helpers';

jest.mock("@/env/variables");

function renderHome(provide: any) {
  return renderView(Home, { global: { provide } });
}

describe("layout/Home.vue", () => {
  test("sign in", async () => {
    const wallet = mockWallet();
    const { getByTestId } = renderHome({ wallet, contractId })

    await fireEvent.click(getByTestId("signInHome"));

    expect(wallet.requestSignIn).toHaveBeenCalledWith({ contractId });
  });
});
