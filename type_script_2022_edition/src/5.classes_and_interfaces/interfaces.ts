/*
* [ using interfaces with classes ]
*/
interface Named {
  name: string;
}

interface Greetabl {
  greet(phrase: string): void;
}

interface GreetablPerson1 extends Named, Greetabl {}

class GreetablPerson implements GreetablPerson1 {
  constructor(public name: string) {}

  greet(phrase: string): void {
    console.log(`Hey ${this.name}: ${phrase}`)
  }
}

let greetablPerson1: GreetablPerson1;
// let greetablPerson1: GreetablPerson;

greetablPerson1 = new GreetablPerson('Artsem')
greetablPerson1.greet(`What's up?`)

/*
* [ readonly interface properties ]
*/
interface GreetablWithReadonly {
  // age: number;
  readonly age: number;
}

class GreetablPersonWithReadonlyAge implements GreetablWithReadonly {
  age: number;

  constructor(age: number) {
    this.age = age
  }
}

const greetablPersonWithReadonlyAgg: GreetablWithReadonly = new GreetablPersonWithReadonlyAge(26)
// greetablPersonWithReadonlyAgg.age = 20
console.log({ greetablPersonWithReadonlyAgg })

/*
* [ interfaces as function types ]
*/
interface NewFunction {
  (a: number, b: number): number
}

// const newFunction: NewFunction = (a, b: string) => a + b
const newFunction: NewFunction = (a, b) => a + b;

/*
* [ optional parameters & properties ]
*/
interface GreetablWithOptional extends GreetablWithReadonly {
  name?: string;
}

class GreetablPersonWithOptional implements GreetablWithOptional {
  name?: string;

  constructor(public age: number, name?: string) {
    if (name) {
      this.name = name
    }
  }
}

const greetablPersonWithOptional1 = new GreetablPersonWithOptional(26)
console.log({ greetablPersonWithOptional1 })
const greetablPersonWithOptional2 = new GreetablPersonWithOptional(26, 'Artsem')
console.log({ greetablPersonWithOptional2 })

// look at "generic classes" (7.generics)