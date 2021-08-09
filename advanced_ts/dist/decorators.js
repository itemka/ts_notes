"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
function DecoratorClass(constructor) {
    console.log('DecoratorClass', constructor);
}
function DecoratorProperty(target, propName) {
    console.log('DecoratorProperty', target);
    console.log('DecoratorProperty', propName);
}
function DecoratorMethod(target, propName, descriptor) {
    console.log('DecoratorMethod', target);
    console.log('DecoratorMethod', propName);
    console.log('DecoratorMethod', descriptor);
}
function DecoratorGetterSetter(target, propName, descriptor) {
    console.log('DecoratorGetterSetter', target);
    console.log('DecoratorGetterSetter', propName);
    console.log('DecoratorGetterSetter', descriptor);
}
let MyComponent = class MyComponent {
    constructor(name) {
        this.name = name;
    }
    get componentName() {
        return this.name;
    }
    logName() {
        console.log(`name: ${this.name}`);
    }
};
__decorate([
    DecoratorProperty
], MyComponent.prototype, "name", void 0);
__decorate([
    DecoratorGetterSetter
], MyComponent.prototype, "componentName", null);
__decorate([
    DecoratorMethod
], MyComponent.prototype, "logName", null);
MyComponent = __decorate([
    DecoratorClass
], MyComponent);
function Component(config) {
    return function (Construnctor) {
        return class extends Construnctor {
            constructor(...args) {
                super(...args);
                const el = document.querySelector(config.selector);
                el.innerHTML = config.template;
            }
        };
    };
}
function Bind(_, _2, descriptor) {
    const original = descriptor.value;
    return {
        configurable: true,
        enumerable: false,
        get() {
            return original.bind(this);
        }
    };
}
let CardComponent = class CardComponent {
    constructor(name) {
        this.name = name;
    }
    logName() {
        console.log(`name: ${this.name}`);
    }
};
__decorate([
    Bind
], CardComponent.prototype, "logName", null);
CardComponent = __decorate([
    Component({
        selector: '#card',
        template: `
    <div class="card">
      <div class="card-content">
        <span class="card-title">
          Card component
        </span>
      </div> 
    </div>
  `
    })
], CardComponent);
const card = new CardComponent('MyCardComponent');
const btnDecorator = document.querySelector('#btnDecorator');
btnDecorator.addEventListener('click', card.logName);
const validators = {};
function Required(target, propName) {
    validators[target.constructor.name] = Object.assign(Object.assign({}, validators[target.constructor.name]), { [propName]: 'required' });
}
function validate(object) {
    const objectConfig = validators[object.constructor.name];
    if (!objectConfig) {
        return true;
    }
    let isValid = true;
    Object.keys(objectConfig).forEach(key => {
        if (objectConfig[key] === 'required') {
            isValid = isValid && Boolean(object[key]);
        }
    });
    return isValid;
}
class Form {
    constructor(email) {
        this.email = email;
    }
}
__decorate([
    Required
], Form.prototype, "email", void 0);
const form = new Form();
if (validate(form)) {
    console.log('Valid', form);
}
else {
    console.log('Validation error');
}
//# sourceMappingURL=decorators.js.map