/*
* [ intersection types ]
*/
type Admin = {
  name: string;
  privileges: string[]
}

type Employee = {
  name: string;
  startDate: Date;
}

type ElevatedEmployee = Admin & Employee;

const elevatedEmployee: ElevatedEmployee = {
  name: 'Artsem',
  privileges: ['admin'],
  startDate: new Date()
}

/*
* [ more on type guards ]
*/
type CombinableType = string | number;
type Numeric = number | boolean;
type Universal = CombinableType & ElevatedEmployee;

function addFunction1(a: CombinableType, b: CombinableType) {
  if (typeof a === 'string' || typeof b === 'string') {
    return a.toString() + b.toString()
  }

  return a + b
}

type UnknownEmployee = Admin | Employee;

function printEmployeeInfo(employee: UnknownEmployee) {
  console.log('Name: ' + employee.name)

  if ('privileges' in employee) {
    console.log('Privileges: ' + employee.privileges)
  }

  if ('startDate' in employee) {
    console.log('Start date: ' + employee.startDate)
  }
}
const { name: employeeName, startDate } = elevatedEmployee
printEmployeeInfo(elevatedEmployee)
printEmployeeInfo({ name: employeeName, startDate })

class Car {
  drive() {
    console.log('Driving a car...')
  }
}

class Truck {
  drive() {
    console.log('Driving a truck...')
  }

  loadCargo(amount: number) {
    console.log('Loading cargo... ' + amount)
  }
}

type Vehicle = Car | Truck;

const vehicle1: Vehicle = new Car();
const vehicle2: Vehicle = new Truck();

function useVehicle(vehicle: Vehicle) {
  vehicle.drive()

  if (vehicle instanceof Truck) {
    vehicle.loadCargo(1000)
  }
}

useVehicle(vehicle1)
useVehicle(vehicle2)

/*
* [ discriminated unions ]
*/
interface Bird {
  type: 'bird';
  flyingSpeed: number;
}
interface Horse {
  type: 'horse';
  runningSpeed: number;
}
type Animal = Bird | Horse;

function moveAnimal(animal: Animal) {
  let speed: number;

  switch (animal.type) {
    case "bird":
      speed = animal.flyingSpeed
      break;
    case "horse":
      speed = animal.runningSpeed
      break;
  }

  console.log('Moving with speed: ' + speed)
}

moveAnimal({ type: 'bird', flyingSpeed: 10 })

/*
* [ type casting ]
*/
// const userInputElement = <HTMLInputElement>document.getElementById('message-output')!
const userInputElement = document.getElementById('message-output')! as HTMLInputElement;
userInputElement.value = "Hi there!"

/*
* [ index properties ]
*/
interface ErrorContainer {
  [key: string]: string;
}
const errorBag: ErrorContainer = {
  email: 'Not valid',
  // id: 3
}

/*
* [ function overloads ]
*/
function addFunction2(a: number, b: number): number;
function addFunction2(a: string, b: string): string;
function addFunction2(a: string, b: number): string;
function addFunction2(a: number, b: string): string;
function addFunction2(a: CombinableType, b: CombinableType) {
  if (typeof a === 'string' || typeof b === 'string') {
    return a.toString() + b.toString()
  }

  return a + b
}

const addFunction2Result1 =  addFunction2('new', 'text')
addFunction2Result1.split('')
const addFunction2Resul2 =  addFunction2(3, 5)
// addFunction2Resul2.split('')

/*
* [ optional chaining ]
*/
interface FetchedUSerData {
  id: string;
  name: string;
  job: {
    title: string;
    description: string;
  }
}

const fetchedUSerData = {
  id: '1',
  name: 'Artsem',
  // job: {
  //   title: 'Software Developer',
  //   description: 'Code writing'
  // }
} as FetchedUSerData

console.log('fetchedUSerData title: ', fetchedUSerData?.job?.title)

/*
* [ nullish coalescing ]
*/
const userInput = '';
const storedData = userInput ?? 'DEFAULT'
console.log({ storedData })
