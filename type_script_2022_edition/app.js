function add(number1, number2, isPrint, phrase) {
    var sum = number1 + number2;
    if (isPrint) {
        console.log(phrase, sum);
        return;
    }
    return sum;
}
var n1 = 5;
var n2 = 2.8;
var printResult = true;
var phrase = 'Result is:';
var result = add(n1, n2, printResult, phrase);
