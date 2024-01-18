function SumOrCat(arr) {
    if (arr.every(function (item) { return typeof item === 'string'; }))
        return arr.join('');
    // if (arr.every((item) => typeof item === 'number')) 
    else {
        var sum = 0;
        for (var _i = 0, arr_1 = arr; _i < arr_1.length; _i++) {
            var num = arr_1[_i];
            sum += num;
        }
        return sum;
    }
    return "Invalid input";
}
var s1 = SumOrCat(["Hello", "World"]);
console.log(s1);
var n1 = SumOrCat([1, 2, 3, 4, 5]);
console.log(n1);
