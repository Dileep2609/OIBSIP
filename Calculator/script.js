const display = document.getElementById("display");

function playSound() {
  document.getElementById("clickSound").play();
}

function appendValue(value) {
  playSound();
  display.value += value;
}

function clearDisplay() {
  display.value = "";
}

function deleteLast() {
  display.value = display.value.slice(0, -1);
}

function calculate() {
  try {
    let expression = display.value;
    let result = eval(expression);

    document.getElementById("history").innerHTML += `
            <div>${expression} = ${result}</div>
        `;

    display.value = result;
  } catch (error) {
    display.value = "Error";
  }
}

function toggleTheme() {
  document.body.classList.toggle("light-mode");
}

document.addEventListener("keydown", function (event) {
  const key = event.key;

  if (!isNaN(key) || "+-*/.%".includes(key)) {
    appendValue(key);
  } else if (key === "Enter") {
    calculate();
  } else if (key === "Backspace") {
    deleteLast();
  } else if (key === "Escape") {
    clearDisplay();
  }
});
