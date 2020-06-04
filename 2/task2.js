function factor(digit){
    if (digit==1 || digit==0){
        return 1;
    }
    else{
        return digit * factor(digit-1);
    }
}

function task2(pawn_amount, size){
    return factor(size)/(factor(size-pawn_amount)*factor(pawn_amount));
}

var pawn = 8;//количество пешек
var size = 64;//размер поля х*у
console.log(task2(pawn, size));