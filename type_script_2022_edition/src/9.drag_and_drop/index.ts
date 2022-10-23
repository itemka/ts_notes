function Autobind(_: any, _2: string | Symbol | number, descriptor: PropertyDescriptor): PropertyDescriptor {
  const originalMethod = descriptor.value;

  return {
    configurable: descriptor.configurable,
    enumerable: descriptor.enumerable,
    get() {
      return originalMethod.bind(this)
    }
  }
}

class ProjectInput {
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  element: HTMLFormElement;
  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  peopleInputElement: HTMLInputElement;

  constructor() {
    this.templateElement = document.getElementById('project-input')! as HTMLTemplateElement;
    this.hostElement = document.getElementById('app')! as HTMLDivElement;

    const importedNode = document.importNode(this.templateElement.content, true);
    this.element = importedNode.firstElementChild as HTMLFormElement;
    this.element.id = 'user-input';

    this.titleInputElement = this.element.querySelector('#title') as HTMLInputElement;
    this.descriptionInputElement = this.element.querySelector('#description') as HTMLInputElement;
    this.peopleInputElement = this.element.querySelector('#people') as HTMLInputElement;

    this.configure();
    this.render();
  }

  @Autobind
  private submitHandler(event: SubmitEvent) {
    event.preventDefault();

    console.log(['submitHandler'], {
      title: this.titleInputElement.value,
      description: this.descriptionInputElement.value,
      people: this.peopleInputElement.value,
    })
  }

  private configure() {
    this.element.addEventListener('submit', this.submitHandler)
  }

  private render() {
    this.hostElement.insertAdjacentElement('afterbegin', this.element)
  }
}

const projectInput = new ProjectInput();