const operationDisplay = document.getElementById("operationDisplay");
const resultsDisplay = document.getElementById("resultsDisplay");
const operators = ["÷", "x", "-", "+"];
let results = "0";
let argument1 = "";
let argument2 = "";
let operator = "";

let clearResults = () => {
    results = "0";
    argument1 = ""
    argument2 = ""
    operator = "";
    updateDisplay();
}

let deleteEntry = () => {
    if(argument2 != "") argument2 = argument2.slice(0, -1);
    else if(operator != "") operator = "";
    else argument1 = argument1.slice(0, -1);
    updateDisplay();
}

let divide = () => {
    results = parseFloat(argument1) / parseFloat(argument2);
}

let multiply = () => {
    results = parseFloat(argument1) * parseFloat(argument2);
}

let subtract = () => {
    results = parseFloat(argument1) - parseFloat(argument2);
}

let add = () => {
    results = parseFloat(argument1) + parseFloat(argument2);
}

/*
Handle what is done with data formatting after evaluation before any more buttons are pressed.
This is needed because of how "=" is currently handled as a pseudo-operator in argumentsSelected.
*/
let handleEval = (data) => {
    if(data == "=" && !argument2.includes("=")) argument2 += " =";
    else if(data != "=") {
        argument2 = "";
        operator = data;
        argument1 = results;
    }
}

let evaluate = (data) => {
    switch(operator) {
        case "÷":
            divide();
            break;
        case "x":
            multiply();
            break;
        case "-":
            subtract();
            break;
        case "+":
            add();
    }
    handleEval(data);
}

//If operator/arguments are selected and another operator is given we can evaluate
let argumentsSelected = (data) => {
    if(operators.some(v => data.includes(v)) || data.includes("=")) {
        return argument2 != "";
    }
    return false;
}

//Argument1 is selected, but argument2 is not means we can select an operator
let operatorAvailable = (data) => {
    return (argument2 == "" && operators.some(v => data.includes(v)));
}

//Only add "." once and never add "=" to an argument
let updateArgument = (argument, data) => {
    if(data == ".") {
        if(!argument.includes(".")) return argument + data;
        else return argument;
    }
    else if(data == "=") return argument;
    else return argument + data;
}

let updateDisplay = () => {
    operationDisplay.textContent = `${argument1} ${operator} ${argument2}`;
    resultsDisplay.textContent = results;
}

/*
Handle what happens if you keep hitting buttons after a result.
Currently needed because of how "=" is handled.
*/
let handleMemory = (data) => {
    if(!isNaN(data) && argument2.includes("=")) clearResults();
    else if(data != "=" && argument2.includes("=")) {
        argument2 = "";
        argument1 = results;
    }
}
//Takes arguments and operates when arguments are full
let operate = (button) => {
    let data = button.textContent;
    handleMemory(data);

    if(argumentsSelected(data)) evaluate(data);
    else if(operatorAvailable(data)){
        if(argument1 == "") argument1 = results;
        operator = data;
    } 
    else if(operator != "") argument2 = updateArgument(argument2, data);
    else argument1 = updateArgument(argument1, data);
    updateDisplay();
}
