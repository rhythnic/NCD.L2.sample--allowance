import { fireEvent } from "@testing-library/vue";
import { RouterLinkStub } from "@vue/test-utils";
import Header from "../Header.vue";
import { renderView } from '@/test-helpers';

jest.mock("@/env/variables");

const locale = "en-US";

function renderHeader(props: any) {
  return renderView(Header, { props, global: { stubs: { RouterLink: RouterLinkStub } } });
}

describe("layout/Header.vue", () => {
  test("sign in", async () => {
    const { getByTestId, emitted } = renderHeader({ locale });

    await fireEvent.click(getByTestId("signInDesktop"));

    await fireEvent.click(getByTestId("mobileMenuButton"));
    await fireEvent.click(getByTestId("signInMobile"));

    expect(emitted().signIn).toHaveLength(2);
  });

  test("sign out", async () => {
    const accountId = "ACCOUNT_ID";

    const { getByText, getByTestId, emitted } = renderHeader({ locale, accountId });

    await fireEvent.click(getByText(accountId));

    await fireEvent.click(getByTestId("signOutDesktop"));

    await fireEvent.click(getByTestId("mobileMenuButton"));
    await fireEvent.click(getByTestId("signOutMobile"));

    expect(emitted().signOut).toHaveLength(2);
  });

  test("select locale", async () => {
    const { getByText, getByTestId, emitted } = renderHeader({ locale });

    const localeSelectDesktop = getByTestId(
      "localeSelectDesktop",
    ).querySelector("button") as HTMLElement;
    await fireEvent.click(localeSelectDesktop);
    await fireEvent.click(getByText("한국어"));
    await fireEvent.click(localeSelectDesktop); // close desktop select

    await fireEvent.click(getByTestId("mobileMenuButton"));
    const localeSelectMobile = getByTestId("localeSelectMobile").querySelector(
      "button",
    ) as HTMLElement;
    await fireEvent.click(localeSelectMobile);
    await fireEvent.click(getByText("한국어"));

    expect(emitted().selectLocale).toHaveLength(2);
  });
});
