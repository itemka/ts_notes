/*
* [ first class decorator ]
*/
function Logger(constructor: Function) {
  console.log('Loading Logger...');
  console.log({ constructor });
}

@Logger
class Person {
 name = `Artsem. ${Person.name}`

 constructor() {
   console.log(`${Person.name} class is created...`)
 }
}

const person1 = new Person()
console.log({ person1 })

/*
* [ decorator factories ]
*/
function LoggerDecoratorFactories(logString: string) {
  return function(constructor: Function) {
    console.log('Loading LoggerDecoratorFactories...', logString);
    console.log({ constructor });
  }
}

@LoggerDecoratorFactories('LoggerDecoratorFactories')
class PersonDecoratorFactories {
  name = `Artsem. ${PersonDecoratorFactories.name}`

  constructor() {
    console.log(`${PersonDecoratorFactories.name} class is created...`)
  }
}

const personDecoratorFactories = new PersonDecoratorFactories()
console.log({ personDecoratorFactories })

/*
* [ building more useful decorators ]
*/
function WithTemplate(template: string, hookId: string) {
  return function(constructor: any) {
    const person = new constructor();
    const hookEl = document.getElementById(hookId);

    if (hookEl) {
      hookEl.innerHTML = template;
      hookEl.querySelector('h4')!.textContent = person.name;
    }
  }
}

@WithTemplate('<h4>WithTemplate</h4>', 'decorators')
class PersonUsefulDecorators {
  name = `Artsem. ${PersonUsefulDecorators.name}`

  constructor() {
    console.log(`${PersonUsefulDecorators.name} class is created...`)
  }
}

const personUsefulDecorators = new PersonUsefulDecorators()
console.log({ personUsefulDecorators })

/*
* [ multiple decorators ]
*/
function LoggerMultipleDecorators() {
  console.log('Logger FACTORY');

  return function(_: Function) {
    console.log('Loading LoggerDecoratorFactories...');
  }
}

function WithTemplateMultipleDecorators() {
  console.log('WithTemplate FACTORY');

  return function(_: Function) {
    console.log('Loading WithTemplateMultipleDecorators...');
  }
}

@LoggerMultipleDecorators()
@WithTemplateMultipleDecorators()
class PersonMultipleDecorators {
  name = `Artsem. ${PersonMultipleDecorators.name}`

  constructor() {
    console.log(`${PersonMultipleDecorators.name} class is created...`)
  }
}

const personMultipleDecorators = new PersonMultipleDecorators()
console.log({ personMultipleDecorators })

/*
* [ property & accessor & methods & parameter decorators ]
*/
function LogProperty(target: any, propertyName: string | Symbol) {
  console.log('LogProperty decorator!', { target, propertyName })
}

function LogAccessor(target: any, name: string, descriptor: PropertyDescriptor) {
  console.log('LogAccessor decorator!', { target, name, descriptor })
}

function LogMethod(target: any, name: string | Symbol, descriptor: PropertyDescriptor) {
  console.log('LogMethod decorator!', { target, name, descriptor })
}

function LogParameter(target: any, name: string | Symbol, position: number) {
  console.log('LogParameter decorator!', { target, name, position })
}

class Product {
  @LogProperty
  title: string;
  private _price: number;

  constructor(title: string, price: number) {
    this.title = title;
    this._price = price
  }

  @LogAccessor
  set price(value: number) {
    if (value > 0) {
      this._price = value
    } else {
      throw Error('Invalid price - should be positive!')
    }
  }

  @LogMethod
  getPriceWithTax(@LogParameter tax: number) {
    return this._price * (1 + tax);
  }
}

/*
* [ when do decorators execute ]
*/
const product1 = new Product('Book 1', 10);
const product12 = new Product('Book 2', 14);

/*
* [ returning (and changing) a class in a class decorator ]
*/
function WithTemplateReturningClass(template: string, hookId: string) {
  return function<T extends { new(...args: any[]): { name: string } }>(originalConstructor: T) {
    return class extends originalConstructor {
      constructor(..._: any[]) {
        super();

        const hookEl = document.getElementById(hookId);

        if (hookEl) {
          hookEl.innerHTML = template;
          hookEl.querySelector('h4')!.textContent = this.name;
        }
      }
    }
  }
}

@WithTemplateReturningClass('<h4>WithTemplateReturningClass</h4>', 'decorators')
class PersonReturningClass {
  name = `Artsem. ${PersonReturningClass.name}`;

  constructor() {
    console.log(`${PersonReturningClass.name} class is created...`)
  }
}

const personReturningClass = new PersonReturningClass()

/*
* [ other decorator return types ]
*/
function LogAccessorReturnTypes(target: any, name: string, descriptor: PropertyDescriptor): PropertyDescriptor {
  console.log('LogAccessorReturnTypes decorator!', { target, name, descriptor })

  return {
    ...descriptor,
  }
}

function LogMethodReturnTypes(target: any, name: string | Symbol, descriptor: PropertyDescriptor): PropertyDescriptor {
  console.log('LogMethodReturnTypes decorator!', { target, name, descriptor })

  return {
    ...descriptor,
  }
}

class ProductAccessorAndMethodReturnTypes {
  title: string;
  private _price: number;

  constructor(title: string, price: number) {
    this.title = title;
    this._price = price
  }

  @LogAccessorReturnTypes
  set price(value: number) {
    if (value > 0) {
      this._price = value
    } else {
      throw Error('Invalid price - should be positive!')
    }
  }

  @LogMethodReturnTypes
  getPriceWithTax(tax: number) {
    return this._price * (1 + tax);
  }
}

/*
* [ example: creating an "autobind" decorator ]
*/
function AutobindSample(_: any, _2: string | Symbol | number, descriptor: PropertyDescriptor): PropertyDescriptor {
  console.log('Autobind decorator!', { descriptor })

  const originalMethod = descriptor.value;

  return {
    configurable: descriptor.configurable,
    enumerable: descriptor.enumerable,
    get() {
      return originalMethod.bind(this)
    }
  }
}

class Printer {
  massage = 'Text message'

  @AutobindSample
  showMessage() {
    console.log('Printer. showMessage: ', this.massage)
  }
}

const printer = new Printer();
const printerButton = document.querySelector('button')!;

printerButton.addEventListener('click', printer.showMessage)

/*
* [ validation with decorators ]
*/
interface ValidatorConfig {
  [property: string]: {
    [validatableProp: string]: string[]; // ['required', 'positive']
  }
}

const registeredValidators: ValidatorConfig = {};

function addValidatorsToValidatorConfig(validators: string[], target: any, propertyName: string) {
  const { name: className } = target.constructor;

  registeredValidators[className] = {
    ...registeredValidators[className],
    [propertyName]: [
      ...(registeredValidators[className]?.[propertyName] ?? []),
      ...validators,
    ]
  }
}

function Required(target: any, propertyName: string) {
  addValidatorsToValidatorConfig(['required'], target, propertyName);
}

function PositiveNumber(target: any, propertyName: string) {
  addValidatorsToValidatorConfig(['positive'], target, propertyName);
}

function validate(object: any): boolean {
  let isValid = true;

  const objectValidatorConfig = registeredValidators[object.constructor.name];

  if (!objectValidatorConfig) {
    return isValid
  }

  for (const prop in objectValidatorConfig) {
    for (const validator of objectValidatorConfig[prop]) {
      switch (validator) {
        case 'required':
          isValid = isValid && !!object[prop];
          break;
        case 'positive':
          isValid = isValid && object[prop] > 0;
          break;
      }
    }
  }

  return isValid
}

class Course {
  @Required
  title: string;
  @PositiveNumber
  price: number;

  constructor(title: string, price: number) {
    this.title = title;
    this.price = price;
  }
}

const courseForm = document.querySelector('form')!;

courseForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const { value: title } = document.getElementById('title') as HTMLInputElement;
  const { value: price } = document.getElementById('price') as HTMLInputElement;

  const createdCourse = new Course(title, +price);

  if (!validate(createdCourse)) {
    throw Error('Invalid input, please try again!');
  }

  console.log(createdCourse);
})
