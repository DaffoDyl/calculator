const operators = ["÷", "x", "-", "+"]
let results = "0";
let argument1 = "";
let argument2 = "";
let operator;

let clearResults = () => {
    results = "0";
    argument1 = ""
    argument2 = ""
    operator = undefined;
}

let deleteEntry = () => {
    if(argument2 != "") {
        argument2 = argument2.slice(0, -1);
    }
    else {
        operator = undefined;
        argument1 = argument1.slice(0, -1);
    }
}

let divide = (argument) => {
    
}

let times = () => {
    
}

let subtract = () => {
    
}

let add = () => {
    
}

let equals = (a1, a2, o) => {
    
}

let argumentsSelected = (data) => {
    return (argument2 != "" && operators.some(v => data.includes(v)));
}

let operatorAvailable = (data) => {
    return (argument2 == "" &&operators.some(v => data.includes(v)));
}

let operate = (button) => {
    let data = button.textContent;

    if(argumentsSelected(data)) {
        equals(argument1, argument2, operator)
    }
    else if(operatorAvailable(data)){
        operator = data;
    } 
    else if(operator != undefined) {
        if(data == ".") {
            if(!argument2.includes(".")) argument2 = argument2 + data;
        }
        else {
            argument2 = argument2 + data;
        }
    }
    else {
        if(data == ".") {
            if(!argument1.includes(".")) argument1 = argument1 + data;
        }
        else {
            argument1 = argument1 + data;
        }
    }
    console.log(argument1);
    console.log(argument2);
    console.log(operator);       
}
    