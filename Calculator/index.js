let display = document.getElementById("display");

function appendNumber(num){
  display.value += num;
}

function appendDot(){
  if(!display.value.endsWith(".")) {display.value += ".";}
}

function appendOperator(op){
  if(display.value && !"+-*/".includes(display.value.slice(-1))){
    display.value += op;
  }
}

function clearDisplay(){
  display.value = "";
}

function backspace() {
  const display = document.getElementById("display");
  display.value = display.value.slice(0, -1);
}

function evaluateExpression(){
  try {
    const result = safeEvaluate(display.value);
    display.value = result;
  } catch (error) {
    display.value = "Error";
  }
}

function toRadians(deg){
  return deg * (Math.PI / 180);
}

function calculateSin(){
  try {
    display.value = Math.sin(toRadians(parseFloat(display.value))).toFixed(2);

  } catch (error) {
    display.value = "Error";
  }
}

function calculateCos(){
  try {
    display.value = Math.cos(toRadians(parseFloat(display.value))).toFixed(2);

  } catch (error) {
    display.value = "Error";
  }
}

function calculateTan(){
  try {
    display.value = Math.tan(toRadians(parseFloat(display.value))).toFixed(2);

  } catch (error) {
    display.value = "Error";
  }
}

function calculateSqrt(){
  try {
    display.value = Math.sqrt(parseFloat(display.value)).toFixed(2);
  } catch (error) {
    display.value = "Error";
  }
}

function calculateCbrt(){
  try {
    display.value = Math.cbrt(parseFloat(display.value)).toFixed(2);
  } catch (error) {
    display.value = "Error";
  }
}



function safeEvaluate(expr) {
    const tokens = expr.match(/(\d+(\.\d+)?|[+\-*/])/g);
    if (!tokens) throw "Invalid Expression";

    let result = parseFloat(tokens[0]);
    for (let i = 1; i < tokens.length; i += 2) {
      const op = tokens[i];
      const num = parseFloat(tokens[i + 1]);

      switch (op) {
        case "+": result += num; break;
        case "-": result -= num; break;
        case "*": result *= num; break;
        case "/": result /= num; break;
        default: throw "Invalid operator";
      }
    }
    return result.toFixed(2);
  }

document.addEventListener("keydown", function(e) {
  const key = e.key;

  if (!isNaN(key)) {
    appendNumber(key);
  } else if (['+', '-', '*', '/'].includes(key)) {
    appendOperator(key);
  } else if (key === '.') {
    appendDot();
  } else if (key === 'Backspace') {
    e.preventDefault(); // prevent browser's default back action
    backspace();
  } else if (key === 'Delete') {
    clearDisplay();
  } else if (key === 'Enter' || key === '=') {
    evaluateExpression();
  } else if(key === 's'){
    calculateSqrt();
  }else if(key === 'c'){
    calculateCbrt();
  }else if(key === 'q'){
    calculateSin();
  }else if(key === 'w'){
    calculateCos();
  }else if(key === 'r'){
    calculateTan();
  }
  
});