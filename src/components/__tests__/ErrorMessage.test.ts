import { render } from "@testing-library/vue";
import ErrorMessage from "@/components/ErrorMessage.vue";

const errorMessage = "ERROR_MESSAGE";

describe('components/ErrorMessage.vue', () => {
  test("shows error message", async () => {
    const error = new Error(errorMessage);
  
    const { getByText } = render(ErrorMessage, {
      props: { error },
    });
  
    getByText(errorMessage);
  });
})
