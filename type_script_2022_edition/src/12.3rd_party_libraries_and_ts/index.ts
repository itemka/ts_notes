import 'reflect-metadata';
import shuffle from "lodash/shuffle";
import { ProductTestLib } from "./product.model";
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

/*
* [ using js libs with ts ]
*/
console.log(shuffle([1, 2, 3, 4]));

/*
* [ using "declare" as a "last resort" ]
*/
declare const GLOBAL: string;

console.log({ GLOBAL })

/*
* [ no types needed: class-transformer ]
*/
const products = [
  { title: 'Book 1', price: 1.99 },
  { title: '', price: -3.45 },
]

// const loadedProduct = products.map((product) => {
//   return new ProductTestLib(product.title, product.price)
// });
const loadedProduct = plainToInstance(ProductTestLib, products);

/*
* [ ts-embracing: class-validator ]
*/
for (const product of loadedProduct) {
  validate(product).then((errors) => {
    if (errors.length > 0) {
      console.log('Validation errors!', { errors })
    } else {
      console.log(product.getInformation())
    }
  })
}
