/// <reference path='form-namespace.ts' />

namespace NamespaceForm {
  class MyForm {
    private type: FormType = 'inline'
    private state: FormState = 'active'

    constructor(public email: string) {}

    getInfo(): IFormInfo {
      return {
        type: this.type,
        state: this.state
      }
    }
  }

  export const myForm = new MyForm('tesst@tesst.com')
}

console.log(NamespaceForm.myForm);


// + https://github.com/typestack/class-transformer
// + https://github.com/typestack/class-validator