function changemoney() {
    let amount = document.getElementById("amount").value;
    let from = document.getElementById("from").value;
    let to = document.getElementById("to").value;
    let result = document.getElementById("result").value;
    if (from == "USD" && to == "VND") {
        result = "result: " + (amount * 23000) + " VNĐ";
    }
    else if (from == "VND" && to =="USD"){
        result = "result: " + (amount / 23000) + " $";
    }
    else if (from == "VND") {
        result = "result: " + amount + " VNĐ"
    } else {
        result = "result: " + amount + " $"
    }

    document.getElementById("result").innerHTML = result;

}