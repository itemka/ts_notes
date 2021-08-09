"use strict";
const cars = ['adsf', 'asf', 'sfas'];
const cars2 = ['adsf', 'asf', 'sfas'];
const promise = new Promise(resolve => {
    setTimeout(() => {
        resolve('Promise resolved');
    }, 500);
});
promise.then(data => {
    console.log(data.toLowerCase());
});
function mergeObjects(a, b) {
    return Object.assign({}, a, b);
}
const merged = mergeObjects({ name: 'Artyom' }, { age: 25 });
console.log(merged.age);
const merged2 = mergeObjects({ m: 'Name' }, { a: 'diff' });
console.log(merged2.a);
function withCount(value) {
    return {
        value,
        count: `There are ${value.length} symbols.`
    };
}
console.log(withCount('hi ts'));
console.log(withCount({ length: 4 }));
function getObjectValue(obj, key) {
    return obj[key];
}
const person = {
    name: "Artyom",
    age: 25,
};
console.log(getObjectValue(person, 'name'));
console.log(getObjectValue(person, 'age'));
class Collection {
    constructor(_items = []) {
        this._items = _items;
    }
    addItem(item) {
        this._items.push(item);
    }
    removeItem(item) {
        return this._items = this._items.filter(i => i !== item);
    }
    get items() {
        return this._items;
    }
}
const strings = new Collection(['asf', 'asga', 'afasf']);
strings.addItem('!');
strings.removeItem(('afasf'));
const numbers = new Collection([1, 2, 3]);
numbers.addItem(3);
numbers.removeItem(2);
console.log(numbers.items);
function createAndValidateCar(modal, year) {
    const car = {};
    if (modal.length > 3) {
        car.modal = modal;
    }
    if (year > 2000) {
        car.year = year;
    }
    return car;
}
const car_modals = ['Ford', 'Audi'];
const ford = {
    modal: 'ford',
    year: 2020,
};
//# sourceMappingURL=generic.js.map