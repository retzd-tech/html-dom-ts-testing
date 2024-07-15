// Function to display the input value with the selected color
export const displayInputValue = (inputField, displayText, colorSelect) => {
    const inputValue = inputField.value;
    const selectedColor = colorSelect.value;
    displayText.textContent = `You typed: ${inputValue}`;
    displayText.style.color = selectedColor;
};
// Function to reset the input and displayed text
export const resetInput = (inputField, displayText) => {
    inputField.value = "";
    displayText.textContent = "";
    displayText.style.color = "black";
};
// Add event listeners in your application logic if necessary
const inputField = document.getElementById("inputField");
const displayButton = document.getElementById("displayButton");
const colorSelect = document.getElementById("colorSelect");
const resetButton = document.getElementById("resetButton");
const displayText = document.getElementById("displayText");
if (displayButton && resetButton && inputField && colorSelect && displayText) {
    displayButton.addEventListener("click", () => displayInputValue(inputField, displayText, colorSelect));
    resetButton.addEventListener("click", () => resetInput(inputField, displayText));
}
