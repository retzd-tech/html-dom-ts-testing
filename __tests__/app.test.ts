import "@testing-library/jest-dom";
import { JSDOM } from "jsdom";
import { displayInputValue, resetInput } from "../app.ts";

describe("DOM Manipulation", () => {
  let dom: JSDOM;
  let container: HTMLElement;
  let inputField: HTMLInputElement;
  let displayText: HTMLParagraphElement;
  let colorSelect: HTMLSelectElement;

  beforeEach(() => {
    dom = new JSDOM(`
      <html>
        <body>
          <input type="text" id="inputField" placeholder="Type something...">
          <button id="displayButton">Display Input</button>
          <select id="colorSelect">
            <option value="black">Black</option>
            <option value="red">Red</option>
            <option value="green">Green</option>
            <option value="blue">Blue</option>
          </select>
          <button id="resetButton">Reset</button>
          <p id="displayText"></p>
        </body>
      </html>
    `);
    container = dom.window.document.body;

    // Set up DOM elements
    inputField = container.querySelector("#inputField") as HTMLInputElement;
    displayText = container.querySelector(
      "#displayText"
    ) as HTMLParagraphElement;
    colorSelect = container.querySelector("#colorSelect") as HTMLSelectElement;

    // Define window for the global context
    global.window = dom.window as unknown as Window & typeof globalThis;
  });

  test("displays input text in selected color", () => {
    // Simulate user input and color selection
    inputField.value = "Hello, World!";
    colorSelect.value = "red";

    // Call the function directly
    displayInputValue(inputField, displayText, colorSelect);

    // Assertions
    expect(displayText.textContent).toBe("You typed: Hello, World!");
    expect(displayText.style.color).toBe("red");
  });

  test("resets input and displayed text", () => {
    // Set initial values
    inputField.value = "Hello, World!";
    displayText.textContent = "You typed: Hello, World!";
    displayText.style.color = "red";

    // Call the reset function directly
    resetInput(inputField, displayText);

    // Assertions
    expect(inputField.value).toBe("");
    expect(displayText.textContent).toBe("");
    expect(displayText.style.color).toBe("black");
  });
});
