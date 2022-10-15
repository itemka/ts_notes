"use strict";
// basics types:
// [ number ]
// [ string ]
// [ boolean ]
const n1 = 5;
const n2 = 2.8;
const isPrintResult = false;
const phrase = 'Result is:';
add(n1, n2, isPrintResult, phrase);
function add(number1, number2, isPrint, phrase) {
    const sum = number1 + number2;
    if (isPrint) {
        console.log(phrase, sum);
        return;
    }
    return sum;
}
const person = {
    name: 'Artsem',
    age: 26,
};
const personArray = Object.assign(Object.assign({}, person), { hobbies: ['Sport', 'Thinking'] });
const personTuple = Object.assign(Object.assign({}, personArray), { role: [2, '2'] });
// [ enum ]
var Role;
(function (Role) {
    Role["ADMIN"] = "ADMIN";
    Role[Role["READ_ONLY"] = 3] = "READ_ONLY";
    Role[Role["AUTHOR"] = 4] = "AUTHOR";
})(Role || (Role = {}));
const personEnum = Object.assign(Object.assign({}, personArray), { role: Role.ADMIN });
// [ any ]
const favoriteActivities = ['any', 4, false];
// [ union types '|' ]
combine(23, 5);
function combine(input1, input2) {
    let result;
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
    let result;
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
let combineValues;
// let combineValues: Function;
combineValues = addWithReturnType;
// combineValues = print
combineValues(1, 2);
// [ function types & callbacks ]
addAndHandle(1, 2, (b) => b);
function addAndHandle(n1, n2, cb) {
    const result = addWithReturnType(n1, n2);
    cb(result);
}
// [ unknown ]
// It's better than 'any' due to you need to add check before assign 'unknown' to something
let useInput;
let userName;
useInput = 5;
useInput = '5';
if (typeof useInput === 'string') {
    userName = useInput;
}
// [ never ]
console.log(generateError('New error: ', 432546542));
function generateError(message, code) {
    throw {
        message,
        errorCode: code
    };
    // while (true) {}
}
