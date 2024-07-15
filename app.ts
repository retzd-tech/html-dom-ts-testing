// Function to display the input value with the selected color
export const displayInputValue = (
  inputField: HTMLInputElement,
  displayText: HTMLParagraphElement,
  colorSelect: HTMLSelectElement
) => {
  const inputValue = inputField.value;
  const selectedColor = colorSelect.value;
  displayText.textContent = `You typed: ${inputValue}`;
  displayText.style.color = selectedColor;
};

// Function to reset the input and displayed text
export const resetInput = (
  inputField: HTMLInputElement,
  displayText: HTMLParagraphElement
) => {
  inputField.value = "";
  displayText.textContent = "";
  displayText.style.color = "black";
};

// Add event listeners in your application logic if necessary
const inputField = document.getElementById("inputField") as HTMLInputElement;
const displayButton = document.getElementById(
  "displayButton"
) as HTMLButtonElement;
const colorSelect = document.getElementById("colorSelect") as HTMLSelectElement;
const resetButton = document.getElementById("resetButton") as HTMLButtonElement;
const displayText = document.getElementById(
  "displayText"
) as HTMLParagraphElement;

if (displayButton && resetButton && inputField && colorSelect && displayText) {
  displayButton.addEventListener("click", () =>
    displayInputValue(inputField, displayText, colorSelect)
  );
  resetButton.addEventListener("click", () =>
    resetInput(inputField, displayText)
  );
}
