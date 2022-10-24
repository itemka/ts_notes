/// <reference path="../models/drag-and-drop-types.ts" />
/// <reference path="../models/project.ts" />
/// <reference path="../store/project.ts" />
/// <reference path="../util/validation.ts" />
/// <reference path="../decorators/autobind.ts" />
/// <reference path="base-component.ts" />
/// <reference path="project-item.ts" />
/// <reference path="project-list.ts" />

namespace App {
  export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement>{
    titleInputElement: HTMLInputElement;
    descriptionInputElement: HTMLInputElement;
    peopleInputElement: HTMLInputElement;

    constructor() {
      super('project-input', 'app', true, 'user-input');

      this.titleInputElement = this.element.querySelector('#title') as HTMLInputElement;
      this.descriptionInputElement = this.element.querySelector('#description') as HTMLInputElement;
      this.peopleInputElement = this.element.querySelector('#people') as HTMLInputElement;

      this.configure();
    }

    configure() {
      this.element.addEventListener('submit', this.submitHandler)
    }

    renderContent() {}

    @Autobind
    // @ts-ignore
    private submitHandler(event: SubmitEvent) {
      event.preventDefault();

      const userInput = this.gatherUserInput();

      if (Array.isArray(userInput)) {
        const [title, description, people] = userInput;

        projectState.addProject({ title, description, people });

        this.clearInputs();
      }
    }

    private gatherUserInput(): [string, string, number] | void {
      const title = this.titleInputElement.value;
      const description = this.descriptionInputElement.value;
      const people = this.peopleInputElement.value;

      const titleValidatable: Validatable = {
        value: title,
        required: true,
      }
      const descriptionValidatable: Validatable = {
        value: description,
        required: true,
        minLength: 5
      }
      const peopleValidatable: Validatable = {
        value: +people,
        required: true,
        min: 1,
        max: 5,
      }

      if (
        !validate(titleValidatable) ||
        !validate(descriptionValidatable) ||
        !validate(peopleValidatable)
      ) {
        alert('Invalid input, please try again!')
        return;
      } else {
        return [title, description, +people];
      }
    }

    private clearInputs() {
      this.titleInputElement.value = '';
      this.descriptionInputElement.value = '';
      this.peopleInputElement.value = '';
    }
  }
}