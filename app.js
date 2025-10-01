const display = document.getElementById("display");
let current = "";
let previous = "";
let operator = "";

// update display
function updateDisplay(value) {
  if (value.length > 8) {
    display.textContent = "ERR";
  } else {
    display.textContent = value || "0";
  }
}

// handle digit clicks
document.querySelectorAll(".digit").forEach(btn => {
  btn.addEventListener("click", () => {
    if (current.length < 8) {
      current += btn.textContent;
      updateDisplay(current);
    }
  });
});

// handle operators
document.querySelectorAll(".operator").forEach(btn => {
  btn.addEventListener("click", () => {
    if (current === "" && previous !== "") {
      operator = btn.dataset.action;
      return;
    }
    if (current !== "") {
      if (previous === "") {
        previous = current;
      } else {
        previous = eval(`${previous} ${operator} ${current}`);
      }
    }
    operator = btn.dataset.action;
    current = "";
    updateDisplay(previous.toString());
  });
});

// equal button
document.querySelector(".equal").addEventListener("click", () => {
  if (current !== "" && previous !== "") {
    let result = eval(`${previous} ${operator} ${current}`);
    result = result.toString();
    updateDisplay(result);
    previous = result;
    current = "";
  }
});

// AC button
document.querySelector('[data-action="ac"]').addEventListener("click", () => {
  current = "";
  previous = "";
  operator = "";
  updateDisplay("0");
});

// C button
document.querySelector('[data-action="c"]').addEventListener("click", () => {
  current = current.slice(0, -1);
  updateDisplay(current);
});
