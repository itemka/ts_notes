namespace NamespaceForm {
  export type FormType = 'inline' | 'block'
  export type FormState = 'active' | 'disabled'

  export interface IFormInfo {
    type: FormType,
    state: FormState
  }
}