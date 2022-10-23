type DragEventHandler = (event: DragEvent) => void;

interface Draggable {
  dragStartHandler: DragEventHandler;
  dragEndHandler: DragEventHandler;
}

interface DragTarget {
  dragOverHandler: DragEventHandler;
  dropHandler: DragEventHandler;
  dragLeaveHandler: DragEventHandler;
}

enum ProjectStatus {
  ACTIVE,
  FINISHED
}

class Project {
  constructor(
    public id: string,
    public title: string,
    public description: string,
    public people: number,
    public status: ProjectStatus,
  ) {}
}

type Listener<T> = (items: T[]) => void;

class State<T> {
  protected listeners: Listener<T>[] = [];

  addListener(listenerFunction: Listener<T>) {
    this.listeners.push(listenerFunction);
  }
}

class ProjectState extends State<Project> {
  private projects: Project[] = [];
  private static instance: ProjectState;

  private constructor() {
    super();
  }

  static getInstance() {
    if (this.instance) {
      return this.instance;
    }

    this.instance = new ProjectState();

    return this.instance;
  }

  callListeners() {
    for(const listenerFunction of this.listeners) {
      listenerFunction(this.projects.slice())
    }
  }

  addProject({ title, description, people }: Omit<Project, 'id' | 'status'>) {
    const newProject = new Project(
      Date.now().toString(),
      title,
      description,
      people,
      ProjectStatus.ACTIVE
    )

    this.projects.push(newProject);

    this.callListeners()
  }

  moveProject(projectId: string, newStatus: ProjectStatus) {
    const idx = this.projects.findIndex((project) => project.id === projectId);

    if (idx !== -1 && this.projects[idx].status !== newStatus) {
      this.projects[idx] = {
        ...this.projects[idx],
        status: newStatus,
      }

      this.callListeners();
    }
  }
}

const projectState = ProjectState.getInstance();

abstract class Component<T extends HTMLElement, U extends HTMLElement> {
  templateElement: HTMLTemplateElement;
  hostElement: T;
  element: U;

  constructor(
    templateId: string,
    hostElementId: string,
    insertAtStart: boolean,
    newElementId?: string,
  ) {
    this.templateElement = document.getElementById(templateId)! as HTMLTemplateElement;
    this.hostElement = document.getElementById(hostElementId)! as T;

    const importedNode = document.importNode(this.templateElement.content, true);

    this.element = importedNode.firstElementChild as U;

    if (newElementId) {
      this.element.id = newElementId;
    }

    this.render(insertAtStart);
  }

  private render(insertAtStart: boolean) {
    const where = insertAtStart ? 'afterbegin' : 'beforeend';

    this.hostElement.insertAdjacentElement(where, this.element);
  }

  abstract configure(): void;
  abstract renderContent(): void;
}

interface Validatable {
  value: string | number;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
}

function validate({
  value,
  required,
  minLength,
  maxLength,
  min,
  max,
}: Validatable): boolean {
  let isValid = true;
  const valueLength = value.toString().trim().length;

  if (required) {
    isValid = isValid && valueLength !== 0;
  }

  if (minLength != null && typeof value === 'string') {
    isValid = isValid && valueLength >= minLength;
  }

  if (maxLength != null && typeof value === 'string') {
    isValid = isValid && valueLength <= maxLength;
  }

  if (min != null && typeof value === "number") {
    isValid = isValid && value >= min;
  }

  if (max != null && typeof value === "number") {
    isValid = isValid && value <= max;
  }

  return isValid
}

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

class ProjectInput extends Component<HTMLDivElement, HTMLFormElement>{
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

class ProjectItem extends Component<HTMLUListElement, HTMLLIElement> implements Draggable {
  private project: Project;

  get persons() {
    let people = this.project.people + ' person';

    if (this.project.people !== 1) {
      people = people + 's';
    }

    return people;
  }

  constructor(private hostId: string, project: Project) {
    super('single-project', hostId, true, project.id);

    this.project = project;

    this.configure();
    this.renderContent();
  }

  configure(): void {
    this.element.addEventListener('dragstart', this.dragStartHandler);
    this.element.addEventListener('dragend', this.dragEndHandler);
  }

  renderContent(): void {
    this.element.querySelector('h2')!.textContent = this.project.title;
    this.element.querySelector('h3')!.textContent = this.persons + ' assigned';
    this.element.querySelector('p')!.textContent = this.project.description;
  }

  @Autobind
  dragStartHandler(event: DragEvent): void {
    event.dataTransfer!.setData('text/plain', this.project.id);
    event.dataTransfer!.effectAllowed = 'move';
  }

  dragEndHandler(_: DragEvent): void {
    console.log('Drag end');
  }
}

class ProjectList extends Component<HTMLDivElement, HTMLElement> implements DragTarget {
  assignedProjects: Project[] = [];

  constructor(private type: 'active' | 'finished') {
    super('project-list', 'app', false, `${type}-projects`);

    this.configure();
    this.renderContent();
  }

  configure() {
    this.element.addEventListener('dragover', this.dragOverHandler);
    this.element.addEventListener('drop', this.dropHandler);
    this.element.addEventListener('dragleave', this.dragLeaveHandler);

    projectState.addListener((projects: Project[]) => {
      this.assignedProjects = projects.filter(project => {
        return this.type === "active"
          ? project.status === ProjectStatus.ACTIVE
          : project.status === ProjectStatus.FINISHED;
      });

      this.renderProjects();
    });
  }

  renderContent() {
    const listId = `${this.type}-projects-list`;
    this.element.querySelector('ul')!.setAttribute('id', listId);
    this.element.querySelector('h2')!.textContent = this.type.toUpperCase() + ' PROJECTS';
  }

  @Autobind
  dragOverHandler(event: DragEvent): void {
    if (event.dataTransfer?.types?.[0] === 'text/plain') {
      event.preventDefault();

      this.element.querySelector('ul')!.classList.add('droppable');
    }
  }

  @Autobind
  dropHandler(event: DragEvent): void {
    const projectId = event.dataTransfer!.getData('text/plain');
    const newStatus = this.type === "active"
      ? ProjectStatus.ACTIVE
      : ProjectStatus.FINISHED;

    projectState.moveProject(projectId, newStatus)
  }

  @Autobind
  dragLeaveHandler(_: DragEvent): void {
    this.element.querySelector('ul')!.classList.remove('droppable');
  }

  private renderProjects() {
    const listElement = this.element.querySelector(`#${this.type}-projects-list`)! as HTMLUListElement;

    listElement.innerHTML = '';

    for (const project of this.assignedProjects) {
      const ulElementId = this.element.querySelector('ul')!.id;

      new ProjectItem(ulElementId, project);
    }
  }
}

const projectInput = new ProjectInput();
const activeProjectList = new ProjectList('active');
const finishedProjectList = new ProjectList('finished');
























