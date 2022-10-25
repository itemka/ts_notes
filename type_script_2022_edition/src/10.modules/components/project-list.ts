import { Component } from "./base-component.js";
import { Project, ProjectStatus } from "../models/project.js";
import { DragTarget } from "../models/drag-and-drop-types.js";
import { projectState } from "../store/project.js";
import { Autobind } from "../decorators/autobind.js";
import { ProjectItem } from "./project-item.js";

export class ProjectList extends Component<HTMLDivElement, HTMLElement> implements DragTarget {
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
  // @ts-ignore
  dragOverHandler(event: DragEvent): void {
    if (event.dataTransfer?.types?.[0] === 'text/plain') {
      event.preventDefault();

      this.element.querySelector('ul')!.classList.add('droppable');
    }
  }

  @Autobind
  // @ts-ignore
  dropHandler(event: DragEvent): void {
    const projectId = event.dataTransfer!.getData('text/plain');
    const newStatus = this.type === "active"
      ? ProjectStatus.ACTIVE
      : ProjectStatus.FINISHED;

    projectState.moveProject(projectId, newStatus)
  }

  @Autobind
  // @ts-ignore
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