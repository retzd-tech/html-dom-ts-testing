import "@testing-library/jest-dom";
import { JSDOM } from "jsdom";
import * as app from "../app.ts";

describe("DOM Manipulation", () => {
  let dom: JSDOM;
  let container: HTMLElement;
  let inputField: HTMLInputElement;
  let displayText: HTMLParagraphElement;
  let colorSelect: HTMLSelectElement;
  let displayButton: HTMLButtonElement;
  let resetButton: HTMLButtonElement;

  beforeAll(async () => {
    dom = await JSDOM.fromFile("./index.html");
  });

  beforeEach(() => {
    container = dom.window.document.body;

    displayButton = container.querySelector("#displayButton") as HTMLButtonElement;
    resetButton = container.querySelector("#resetButton") as HTMLButtonElement;

    // Set up DOM elements
    inputField = container.querySelector("#inputField") as HTMLInputElement;
    displayText = container.querySelector("#displayText") as HTMLParagraphElement;
    colorSelect = container.querySelector("#colorSelect") as HTMLSelectElement;

    // Define window for the global context
    global.window = dom.window as unknown as Window & typeof globalThis;

    // Attach the event listeners in the tests
    displayButton.addEventListener("click", () =>
      app.displayInputValue(inputField, displayText, colorSelect)
    );
    resetButton.addEventListener("click", () =>
      app.resetInput(inputField, displayText)
    );

    // Spy on the functions
    jest.spyOn(app, "displayInputValue");
    jest.spyOn(app, "resetInput");
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("it should display input text based on selected color", () => {
    // Simulate user input and color selection
    inputField.value = "Hello, World!";
    colorSelect.value = "red";

    // Call the function directly
    app.displayInputValue(inputField, displayText, colorSelect);

    // Assertions
    expect(displayText.textContent).toBe("You typed: Hello, World!");
    expect(displayText.style.color).toBe("red");
  });

  test("it should reset input and display the original text", () => {
    // Set initial values
    inputField.value = "Hello, World!";
    displayText.textContent = "You typed: Hello, World!";
    displayText.style.color = "red";

    // Call the reset function directly
    app.resetInput(inputField, displayText);

    // Assertions
    expect(inputField.value).toBe("");
    expect(displayText.textContent).toBe("");
    expect(displayText.style.color).toBe("black");
  });

  test("it should calls displayInputValue with correct arguments on button click", () => {
    // Simulate user input and color selection
    inputField.value = "Hello, World!";
    colorSelect.value = "blue";

    // Simulate button click
    displayButton.click();

    // Assertions
    expect(app.displayInputValue).toHaveBeenCalledWith(inputField, displayText, colorSelect);
  });

  test("it should resets input and displayed text on button click", () => {
    // Set initial values
    inputField.value = "Hello, World!";
    displayText.textContent = "You typed: Hello, World!";
    displayText.style.color = "green";

    // Simulate button click
    resetButton.click();

    // Assertions
    expect(app.resetInput).toHaveBeenCalledWith(inputField, displayText);
  });
});
