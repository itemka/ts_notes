/*
* [ built-in generics & what are generics ]
*/
const arrayOfNames: Array<number> = [1, 2]

const promise: Promise<string> = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('Done')
    // resolve('Done')
  }, 1000)
})

promise.then(console.log)

/*
* [ creating a generic function ]
*/
function merge<T, K>(objA: T, objB: K) {
  return Object.assign({}, objA, objB)
}
const mergeResult = merge(
  { name: 'Artsem', hobbies: ['Sport'] },
  { age: 26 },
);
mergeResult.name
mergeResult.age
console.log(mergeResult)

/*
* [ working with constraints ]
*/
function merge2<T extends object, K extends object>(objA: T, objB: K) {
  return merge(objA, objB)
}

const mergeResult2 = merge2(
  { name: 'Artsem', hobbies: ['Sport'] },
  // 26,
  { age: 26 },
);
console.log(mergeResult2)

/*
* [ another generic function ]
*/
interface Length {
  length: number;
}

function countAndDescribe<T extends Length>(value: T): [T, string] {
  let description = 'Got no value';

  if (value.length === 1) {
    description = 'Got 1 element'
  } else if (value.length > 1) {
    description = 'Got ' + value.length + ' elements'
  }

  return [value, description]
}

console.log(countAndDescribe('countAndDescribe1'))
console.log(countAndDescribe(['countAndDescribe1', 'countAndDescribe2']))
console.log(countAndDescribe([]))

/*
* [ "keyof" constraint ]
*/
function extractAndConvert<T extends object, K extends keyof T>(obj: T, key: K) {
  return obj[key]
}

console.log(extractAndConvert(mergeResult2, 'name'))

/*
* [ generic classes ]
*/
class DataStorage<T> {
  private data: T[] = []

  addItem(item: T) {
    this.data.push(item)
  }

  removeItem(item: T) {
    const indexOfItem = this.data.indexOf(item);

    if (indexOfItem === -1) {
      return
    }

    this.data.splice(indexOfItem, 1)
  }

  getItems() {
    return [...this.data]
  }
}

const textStorage = new DataStorage<string | number>()
// textStorage.addItem(true)
textStorage.addItem('temp')
textStorage.addItem('textStorage1')
textStorage.removeItem('temp')
console.log('textStorage: ', textStorage.getItems())

const textStorageWithObj = new DataStorage<object>()
const obj = { name: 'Max' };
textStorageWithObj.addItem(obj)
textStorageWithObj.addItem({ name: 'Artsem' })
textStorageWithObj.removeItem(obj)
console.log('textStorageWithObj: ', textStorageWithObj.getItems())

/*
* [ generic utility types ]
*/
interface CourseGoal {
  title: string;
  description: string;
  completeUntil: Date;
}

function createCourseGoal(
  title: string,
  description: string,
  completeUntil: Date,
): CourseGoal {
  let courseGoal: Partial<CourseGoal> = {};

  courseGoal.title = title;
  courseGoal.description = description;
  courseGoal.completeUntil = completeUntil;

  return courseGoal as CourseGoal
}

const names: Readonly<string[]> = ['Max', 'Artsem'];
// names.push('New namme');
// names[0] = 'New name'
