let displayValue = '';
const errorElement = document.getElementById('error');

function appendToDisplay(value) {
  displayValue += value;
  document.getElementById('display').value = displayValue;
}

function clearDisplay() {
  displayValue = '';
  document.getElementById('display').value = displayValue;
  clearError();
}

function clearError() {
  errorElement.textContent = '';
}

function calculate() {
  try {
    displayValue = eval(displayValue);
    document.getElementById('display').value = displayValue;
    clearError();
  } catch (error) {
    errorElement.textContent = 'Error in calculation!';
  }
}
