// basics types:
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
// [ number ]
// [ string ]
// [ boolean ]
var n1 = 5;
var n2 = 2.8;
var isPrintResult = false;
var phrase = 'Result is:';
add(n1, n2, isPrintResult, phrase);
function add(number1, number2, isPrint, phrase) {
    var sum = number1 + number2;
    if (isPrint) {
        console.log(phrase, sum);
        return;
    }
    return sum;
}
var person = {
    name: 'Artsem',
    age: 26
};
var personArray = __assign(__assign({}, person), { hobbies: ['Sport', 'Thinking'] });
var personTuple = __assign(__assign({}, personArray), { role: [2, '2'] });
// [ enum ]
var Role;
(function (Role) {
    Role["ADMIN"] = "ADMIN";
    Role[Role["READ_ONLY"] = 3] = "READ_ONLY";
    Role[Role["AUTHOR"] = 4] = "AUTHOR";
})(Role || (Role = {}));
var personEnum = __assign(__assign({}, personArray), { role: Role.ADMIN });
// [ any ]
var favoriteActivities = ['any', 4, false];
// [ union types '|' ]
combine(23, 5);
function combine(input1, input2) {
    var result;
    if (typeof input1 === "number" && typeof input2 === 'number') {
        result = input1 + input2;
    }
    else {
        result = input1.toString() + input2.toString();
    }
    return result;
}
combineWithLiteral(23, 5, 'as-number');
function combineWithLiteral(input1, input2, resultConversion) {
    var result;
    if (typeof input1 === "number" && typeof input2 === 'number' || resultConversion === 'as-number') {
        result = +input1 + +input2;
    }
    else {
        result = input1.toString() + input2.toString();
    }
    return result;
}
// [ function return types & "void" ]
printResult(addWithReturnType(1, 2));
function addWithReturnType(n1, n2) {
    return n1 + n2;
}
function printResult(number) {
    console.log('Result: ' + number);
    // return 'result'
}
// [ functions as types ]
var combineValues;
// let combineValues: Function;
combineValues = addWithReturnType;
// combineValues = print
combineValues(1, 2);
// [ function types & callbacks ]
addAndHandle(1, 2, function (b) { return b; });
function addAndHandle(n1, n2, cb) {
    var result = addWithReturnType(n1, n2);
    cb(result);
}
// [ unknown ]
// It's better than 'any' due to you need to add check before assign 'unknown' to something
var useInput;
var userName;
useInput = 5;
useInput = '5';
if (typeof useInput === 'string') {
    userName = useInput;
}
// [ never ]
console.log(generateError('New error: ', 432546542));
function generateError(message, code) {
    throw {
        message: message,
        errorCode: code
    };
    // while (true) {}
}
