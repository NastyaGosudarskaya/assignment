var max_amebas_amount = Math.pow(2, 60);

function task3(amebas_amount){
    var start = amebas_amount;
    var seconds=0;
    while (start<max_amebas_amount) {
        start = start*2;
        seconds++;
    }
    return seconds;
}

var amebas=8; //начальное количество амеб

console.log(task3(amebas));