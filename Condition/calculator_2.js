function add() {
    let num1 = +document.getElementById("num1").value;
    let num2 = +document.getElementById("num2").value;
    let result = num1 + num2;

}
function sub() {
    let num1 = +document.getElementById("num1").value;
    let num2 = +document.getElementById("num2").value;
    let result = num1 - num2;

}
function mul() {
    let num1 = +document.getElementById("num1").value;
    let num2 = +document.getElementById("num2").value;
    let result = num1 * num2;

}
function div() {
    let num1 = +document.getElementById("num1").value;
    let num2 = +document.getElementById("num2").value;
    let result = num1 / num2;

}
function equal() {
    document.getElementById("result").innerHTML = result;
}