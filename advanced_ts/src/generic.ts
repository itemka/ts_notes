const cars: string[] = ['adsf', 'asf', 'sfas']
const cars2: Array<string> = ['adsf', 'asf', 'sfas']

// const promise: Promisse<string> = new Promise(resolve => {
const promise = new Promise<string>(resolve => {
  setTimeout(() => {
    resolve('Promise resolved')
  }, 500)
})

promise.then(data => {
  console.log(data.toLowerCase())
})

//==========
function mergeObjects<T extends object, R extends object>(a: T, b: R): T & R {
  return Object.assign({}, a, b)
}

const merged = mergeObjects({ name: 'Artyom' }, { age: 25 })
console.log(merged.age);
const merged2 = mergeObjects({ m: 'Name' }, { a: 'diff' })
console.log(merged2.a);
// const merged3 = mergeObjects({ test: 2 },'bbbb')
// console.log(merged3);

//==========
interface ILength {
  length: number
}
function withCount<T extends ILength>(value: T): { value: T, count: string } {
  return {
    value,
    count: `There are ${value.length} symbols.`
  }
}

console.log(withCount('hi ts'));
console.log(withCount({ length: 4 }));

//==========
function getObjectValue<T extends object, R extends keyof T>(obj: T, key: R) {
  return obj[key]
}

const person = {
  name: "Artyom",
  age: 25,
}

console.log(getObjectValue(person, 'name'))
console.log(getObjectValue(person, 'age'))
// console.log(getObjectValue(person, 'job'))

//==========
class Collection<T extends number|string|boolean> {
  constructor(private _items: T[] = []) {}

  addItem (item: T) {
    this._items.push(item)
  }

  removeItem (item: T) {
    return this._items = this._items.filter(i => i !== item)
  }

  get items() {
    return this._items
  }
}

const strings = new Collection<string>(['asf', 'asga', 'afasf'])
strings.addItem('!'); strings.removeItem(('afasf'))
const numbers = new Collection<number>([1, 2, 3])
numbers.addItem(3); numbers.removeItem(2)
console.log(numbers.items);
// const objs = new Collection<object>([{a: 4}, {b: 5}])
// objs.removeItem({b: 5})
// console.log(objs.items)

//==========
interface Car {
  modal: string
  year: number
}

function createAndValidateCar(modal: string, year: number): Car {
  const car: Partial<Car> = {}

  if (modal.length > 3) {
    car.modal = modal
  }

  if (year > 2000) {
    car.year = year
  }

  return car as Car
}

//==========
const car_modals: Readonly<Array<string>> = ['Ford', 'Audi']
// car_modals.shift()
const ford: Readonly<Car> = {
  modal: 'ford',
  year: 2020,
}
// ford.modal = "Ferrari"