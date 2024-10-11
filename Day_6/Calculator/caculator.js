function add() {
    if (isNaN(num1) || isNaN(num2)) document.getElementById("result").innerHTML = 'Wrong data'
    else {
        let num1 = +document.getElementById("num1").value;
        let num2 = +document.getElementById("num2").value;
        let result = num1 + num2;
        document.getElementById("result").innerHTML = result;
    }
}
function sub() {
    if (isNaN(num1) || isNaN(num2)) document.getElementById("result").innerHTML = 'Wrong data'
    else {
        let num1 = +document.getElementById("num1").value;
        let num2 = +document.getElementById("num2").value;
        let result = num1 - num2;
        document.getElementById("result").innerHTML = result;
    }
}
function mul() {
    if (isNaN(num1) || isNaN(num2)) document.getElementById("result").innerHTML = 'Wrong data'
    else {
        let num1 = +document.getElementById("num1").value;
        let num2 = +document.getElementById("num2").value;
        let result = num1 * num2;
        document.getElementById("result").innerHTML = result;
    }
}
function div() {
    if (isNaN(num1) || isNaN(num2)) document.getElementById("result").innerHTML = 'Wrong data'
    else {
        let num1 = +document.getElementById("num1").value;
        let num2 = +document.getElementById("num2").value;
        let result = num1 / num2;
        document.getElementById("result").innerHTML = result;
    }
}