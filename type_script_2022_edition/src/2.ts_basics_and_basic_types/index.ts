// basics types:

// [ number ]
// [ string ]
// [ boolean ]
const n1 = 5;
const n2 = 2.8;
const isPrintResult = false;
const phrase = 'Result is:';
add(n1, n2, isPrintResult, phrase);

function add(number1: number, number2: number, isPrint: boolean, phrase?: string): number | undefined {
  const sum = number1 + number2;

  if (isPrint) {
    console.log(phrase, sum)

    return
  }

  return sum
}

// [ object ]
interface Person {
  name: string;
  age: number;
}

const person: Person = {
  name: 'Artsem',
  age: 26,
}

// [ array ]
interface PersonArray extends Person {
  hobbies: string[];
}

const personArray: PersonArray = {
  ...person,
  hobbies: ['Sport', 'Thinking']
}

// [ tuple ]
interface PersonTuple extends PersonArray {
  role: [number, string];
}

const personTuple: PersonTuple = {
  ...personArray,
  role: [2, '2']
}

// [ enum ]
enum Role {
  ADMIN = 'ADMIN',
  READ_ONLY = 3,
  AUTHOR
}

interface PersonEnum extends Omit<PersonTuple, 'role'> {
  role: Role;
}

const personEnum: PersonEnum = {
  ...personArray,
  role: Role.ADMIN,
}

// [ any ]
const favoriteActivities: any = ['any', 4, false]

// [ union types '|' ]
combine(23, 5)

function combine(input1: number | string, input2: number | string): number {
  let result;

  if (typeof input1 === "number" && typeof input2 === 'number') {
    result = input1 + input2
  } else {
    result = input1.toString() + input2.toString()
  }

  return result
}

// [ type aliases / custom types ]
type Combinable = number | string;

// [ literal types ]
type ResultConversion = 'as-number' | 'as-text';

combineWithLiteral(23, 5, 'as-number')

function combineWithLiteral(
  input1: Combinable,
  input2: Combinable,
  resultConversion: ResultConversion
): number {
  let result;

  if (typeof input1 === "number" && typeof input2 === 'number' || resultConversion === 'as-number') {
    result = +input1 + +input2
  } else {
    result = input1.toString() + input2.toString()
  }

  return result
}

// [ function return types & "void" ]
printResult(addWithReturnType(1, 2))

function addWithReturnType(n1: number, n2: number): number {
  return n1 + n2
}

function printResult(number: number): void {
  console.log('Result: ' + number)
  // return 'result'
}

// [ functions as types ]
let combineValues: (number1: number, number2: number) => number;
// let combineValues: Function;
combineValues = addWithReturnType
// combineValues = print

combineValues(1, 2)

// [ function types & callbacks ]
addAndHandle(1, 2, (b: number) => b)

function addAndHandle(n1: number, n2: number, cb: (a: number) => number) {
  const result = addWithReturnType(n1, n2);

  cb(result)
}

// [ unknown ]
// It's better than 'any' due to you need to add check before assign 'unknown' to something
let useInput: unknown;
let userName: string;

useInput = 5;
useInput = '5';

if (typeof useInput === 'string') {
  userName = useInput
}

// [ never ]
console.log(generateError('New error: ', 432546542))

function generateError(message: string, code: number): never {
  throw {
    message,
    errorCode: code
  }

  // while (true) {}
}