// 1 option
function DecoratorClass(constructor: Function) {
  console.log('DecoratorClass', constructor)
}
// 2 option
function DecoratorProperty(target: any, propName: string | Symbol) {
  console.log('DecoratorProperty', target)
  console.log('DecoratorProperty', propName)
}
// 3 option
function DecoratorMethod(target: any, propName: string | Symbol, descriptor: PropertyDescriptor) {
  console.log('DecoratorMethod', target)
  console.log('DecoratorMethod', propName)
  console.log('DecoratorMethod', descriptor)
}
// 4 option
function DecoratorGetterSetter(target: any, propName: string | Symbol, descriptor: PropertyDescriptor) {
  console.log('DecoratorGetterSetter', target)
  console.log('DecoratorGetterSetter', propName)
  console.log('DecoratorGetterSetter', descriptor)
}

@DecoratorClass
class MyComponent {
  @DecoratorProperty
  name: string

  constructor(name: string) {
    this.name = name
  }

  @DecoratorGetterSetter
  get componentName() {
    return this.name
  }

  @DecoratorMethod
  logName():void {
    console.log(`name: ${this.name}`)
  }
}

//==========
interface ComponentDecorator {
  selector: string
  template: string
}

function Component(config: ComponentDecorator) {
  return function <T extends { new(...args: any[]): object }> (Construnctor: T) {
    return class extends Construnctor {
      constructor(...args: any[]) {
        super(...args)

        const el = document.querySelector(config.selector)!
        el.innerHTML = config.template
      }
    }
  }
}

function Bind(_: any, _2: any, descriptor: PropertyDescriptor): PropertyDescriptor {
  const original = descriptor.value

  return {
    configurable: true,
    enumerable: false,
    get() {
      return original.bind(this)
    }
  }
}

@Component({
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
class CardComponent {
  constructor(public name: string) {}

  @Bind
  logName():void {
    console.log(`name: ${this.name}`)
  }
}

const card = new CardComponent('MyCardComponent')

const btnDecorator = document.querySelector('#btnDecorator')!
btnDecorator.addEventListener('click', card.logName)

//==========
type ValidatorType = 'required' | 'email'

interface IValidatorConfig {
  [prop: string]: {
    [validateProp: string]: ValidatorType
  }
}

const validators: IValidatorConfig = {}

function Required(target: any, propName: string) {
  validators[target.constructor.name] = {
    ...validators[target.constructor.name],
    [propName]: 'required'
  }
}

function validate (object: any): boolean {
  const objectConfig = validators[object.constructor.name]

  if (!objectConfig) {
    return true
  }

  let isValid = true

  Object.keys(objectConfig).forEach(key => {
    if (objectConfig[key] === 'required') {
      isValid = isValid && Boolean(object[key])
    }
  })

  return isValid
}

class Form {
  @Required
  public email: string | void

  constructor(email?: string) {
    this.email = email
  }
}

const form = new Form()

if (validate(form)) {
  console.log('Valid', form)
} else {
  console.log('Validation error')
}