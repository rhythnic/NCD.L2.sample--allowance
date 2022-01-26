import { render, fireEvent } from "@testing-library/vue";
import ActionDialog from "@/components/ActionDialog.vue";
import { setupIntersectionObserverMock } from "@/test-helpers/intersection-observer-mock";

const cancelLabel = "CANCEL_TEST";
const confirmLabel = "CONFIRM_TEST";
const errorMessage = "ERROR_MESSAGE";

describe('components/ActionDialog.vue', () => {
  beforeAll(setupIntersectionObserverMock);

  test("emits cancel event", async () => {
    const { getByText, emitted } = render(ActionDialog, {
      props: { title: "Foo", open: true, cancelLabel },
    });
  
    const cancelButton = getByText(cancelLabel);
  
    await fireEvent.click(cancelButton);
  
    expect(emitted().cancel).toBeTruthy();
  });
  
  test("emits confirm event", async () => {
    const { getByText, emitted } = render(ActionDialog, {
      props: { title: "Foo", open: true, confirmLabel },
    });
  
    const confirmButton = getByText(confirmLabel);
  
    await fireEvent.click(confirmButton);
  
    expect(emitted().confirm).toBeTruthy();
  });
  
  test("shows error message", async () => {
    const error = new Error(errorMessage);
  
    const { getByText } = render(ActionDialog, {
      props: { title: "Foo", open: true, actionError: error },
    });
  
    getByText(errorMessage);
  });
})
