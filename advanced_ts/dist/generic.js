"use strict";
const cars = ['adsf', 'asf', 'sfas'];
const cars2 = ['adsf', 'asf', 'sfas'];
const promise = new Promise(resolve => {
    setTimeout(() => {
        resolve('Promise resolve');
    }, 500);
});
promise.then(data => {
    console.log(data);
});
//# sourceMappingURL=generic.js.map