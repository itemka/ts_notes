import {Component} from "./base-component";
import {Draggable} from "../models/drag-and-drop-types";
import {Project} from "../models/project";
import {Autobind} from "../decorators/autobind";

export class ProjectItem extends Component<HTMLUListElement, HTMLLIElement> implements Draggable {
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
  // @ts-ignore
  dragStartHandler(event: DragEvent): void {
    event.dataTransfer!.setData('text/plain', this.project.id);
    event.dataTransfer!.effectAllowed = 'move';
  }

  dragEndHandler(_: DragEvent): void {
    console.log('Drag end');
  }
}