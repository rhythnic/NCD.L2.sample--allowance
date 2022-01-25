import { render, fireEvent } from "@testing-library/vue";
import TextField from "@/components/TextField.vue";

const id = "PROP_NAME";
const label = "LABEL";
const helpText = "HELP_TEXT";
const modelValue = "a";

describe('components/TextField.vue', () => {
  test("shows label", async () => {
    const { getByLabelText } = render(TextField, {
      props: { id, label, helpText, modelValue },
    });
  
    getByLabelText(label);
  });
  
  test("shows help text", async () => {
    const { getByText } = render(TextField, {
      props: { id, label, helpText, modelValue },
    });
  
    getByText(helpText);
  });
  
  test("syncs input value", async () => {
    const { getByDisplayValue, emitted } = render(TextField, {
      props: { id, label, helpText, modelValue },
    });
  
    const inputNode = getByDisplayValue(modelValue);
  
    await fireEvent.update(inputNode, "ab");
  
    expect(emitted()["update:modelValue"][0]).toEqual(["ab"]);
  });
})
