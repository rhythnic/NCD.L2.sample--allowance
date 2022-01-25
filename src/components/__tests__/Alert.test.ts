import { render, fireEvent } from "@testing-library/vue";
import Alert from "@/components/Alert.vue";

const alertMessage = "ALERT_MESSAGE";

describe('components/Alert.vue', () => {
  test("shows message", async () => {
    const { getByText } = render(Alert, {
      props: { modelValue: true, ttl: 3000 },
      slots: {
        default: alertMessage,
      },
    });
  
    getByText(alertMessage);
  });
  
  test("closes on click X", async () => {
    const { emitted, getByTestId } = render(Alert, {
      props: { modelValue: true, ttl: 3000 },
    });
  
    const button = getByTestId("dismiss-btn");
  
    await fireEvent.click(button);
  
    expect(emitted()["update:modelValue"][0]).toEqual([false]);
  });
  
  test("closes after ttl", async () => {
    jest.useFakeTimers();
    const { emitted } = render(Alert, {
      props: { modelValue: true, ttl: 3000 },
    });
  
    jest.runAllTimers();
  
    expect(emitted()["update:modelValue"][0]).toEqual([false]);
  
    jest.useRealTimers();
  });
});
