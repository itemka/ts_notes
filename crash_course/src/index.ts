require('@babel/register')({ extensions: ['.js', '.ts'] })

/**
 * Base types
 */
const test1: string = 'test1';
const test2: Array<number> = [2, 3423]

/**
 * Tuple - array of different types
 */
const test3: [string, number] = ['dsf', 3423]

/**
 * Never: return error and finished | something is constantly doing
 */
const test4 = (): never => {
  while (true) {}
}
const test5 = (): never => {
  throw new Error('sdf')
} 

/**
 * Alias
 */
type ID = string | number
const id: ID = 'sdfsf'

/**
 * Interface
 */
interface IRect {
  readonly id: string
  color?: string
  size: {
    width: number
    height: number
  }
}
const test6 = <IRect>{} // (old)
const test7 = {} as IRect

interface IRectNext extends IRect {
  time: Date
  getArea (date: Date): void 
}

interface IClock {
  time: Date
  getArea (date: Date): void 
}

class Clock implements IClock {
  time: Date = new Date()
  getArea (data: Date): void {
    this.time = data
  }
}

interface Styles {
  [key: string]: string
}

const css: Styles = {
  margin: '2px',
}

/**
 * Enum
 */
enum Membership {
  test_1,
  test_2,
  test_3
}

const membership1 = Membership.test_2
const membership2 = Membership[2]
// console.log({ membership1 })
// console.log({ membership2 })

enum SocialMedia {
  ins = 'INSTAGRAMM',
  tesst = 'TEST',
}
// console.log(typeof SocialMedia.ins)

/**
 * Functions
 */
interface MyPosition {
  x: number | undefined,
  y: number | undefined,
}
interface MyPositionDefault extends MyPosition {
  default: string
}
// overload - перегрузка
function position(): MyPosition;
function position(a: number): MyPositionDefault;
function position(a: number, b: number): MyPosition;

function position(a?: number, b?:number) {
  if (!a && !b) {
    return {
      x: undefined,
      y: undefined,
    }
  }

  if (a && !b) {
    return {
      x: a,
      y: undefined,
      default: a.toString(),
    } as MyPositionDefault
  }

  return {
    x: a,
    y: b,
  }
}
// console.log('Empty0:', position())
// console.log('Empty1:', position(23))
// console.log('Empty2:', position(23, 324))

/**
 * Class
 */
class TypeScript {
  version: string

  constructor (version: string) {
    this.version = version
  }

  info (name: string) {
    return `[${name}]: Typescript version is ${this.version}`
  }
}

class Car {
  readonly modal: string
  readonly numberOfWheels: number = 4

  constructor (theModal: string) {
    // we can rewrite it only inside constructor
    this.modal = theModal
  }
}
// the same
class Car2 {
  readonly numberOfWheels: number = 4
  constructor (readonly modal: string) {}
}

/**
 * Модификаторы полей (protected|public|private)
 */
class Animal {
  protected voice: string = ''
  public color: string = 'black'

  constructor () {
    this.go()
  }

  private go() {
    console.log('Go')
  }
}

class Cat extends Animal {
  public setVoice (voice: string): void {
    this.voice = voice
  }
}

const cat = new Cat()

/**
 * Абстрактные классы
 */
abstract class Component {
  abstract render():void
  abstract info():string
}

class AppComponent extends Component {
  render(): void {
    console.log('render')
  }
  info(): string {
    return 'info'
  }
}

/**
 * Guards
 */
function strip(x: string | number) {
  if (typeof x === 'number') {
    return x.toFixed()
  }

  return x.trim()
}

class MyResponse {
  header = 'res header'
  result = 'res result'
}

class MyError {
  header = 'error header'
  message = 'error message'
}

function handle(res: MyResponse | MyError) {
  if (res instanceof MyResponse) {
    return {
      info: res.header + res.result
    }
  }

  return {
    info: res.header + res.message
  }
}

type AlertType = 'success' | 'danger' | 'warning'
function setAlertType(type: AlertType) {
  // ...
}
setAlertType('success')

/**
 * Generics
 */
const arrayOfNumbers: Array<number> = [1, 1, 2, 3, 5]
const arrayOfStrings: Array<string> = ['1', '2', '2', '3', '5']

function reverse<T>(array: T[]): T[] {
  return array.reverse()
}
// console.log(reverse(arrayOfNumbers))
// console.log(reverse(arrayOfStrings))

/**
 * Operators
 */
interface Person {
  name: string
  age: number
}
type PersonKey = keyof Person // 'name' | 'age'

let key: PersonKey = 'name'
key = 'age'

type User = {
  _id: number
  name: string
  email: string
  createdAt: Date
}

type UserKeysNoMeta1 = Exclude<keyof User, '_id' | 'createdAt'> // 'name' | 'email'
type UserKeysNoMeta2 = Pick<User, 'name' | 'email'> // 'name' | 'email'

const user1: UserKeysNoMeta1 = 'name'