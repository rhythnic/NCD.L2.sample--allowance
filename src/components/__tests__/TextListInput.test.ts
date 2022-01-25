import { render, fireEvent } from "@testing-library/vue";
import TestListInput from "@/components/TestListInput.vue";

const label = "LABEL";
const placeholder = "PLACEHOLDER";
const listTitle = "LIST_TITLE";
const modelValue: string[] = [];

describe('components/TextListInput.vue', () => {
  test("displays text", async () => {
    const { getByText } = render(TestListInput, {
      props: { label, placeholder, listTitle, modelValue },
    });
  
    getByText(label);
    getByText(listTitle);
  });
  
  test("displays list items", async () => {
    const modelValue = ["FIRST_ITEM", "SECOND_ITEM"];
  
    const { getByText } = render(TestListInput, {
      props: { label, placeholder, listTitle, modelValue },
    });
  
    getByText(modelValue[0]);
    getByText(modelValue[1]);
  });
  
  test("adds list item", async () => {
    const addedItem = "Test Item";
  
    const { getByTestId, emitted } = render(TestListInput, {
      props: { label, placeholder, listTitle, modelValue },
    });
  
    const textInput = getByTestId("textInput");
    await fireEvent.update(textInput, addedItem);
  
    const addButton = getByTestId("addButton");
    await fireEvent.click(addButton);
  
    expect(emitted()["update:modelValue"][0]).toEqual([[addedItem]]);
  });
  
  test("deletes list item", async () => {
    const modelValue = ["FIRST_ITEM"];
  
    const { getByTestId, emitted } = render(TestListInput, {
      props: { label, placeholder, listTitle, modelValue },
    });
  
    const deleteButton = getByTestId(`item-${modelValue[0]}`);
    await fireEvent.click(deleteButton);
  
    expect(emitted()["update:modelValue"][0]).toEqual([[]]);
  });
})
