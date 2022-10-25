import { Project, ProjectStatus } from "../models/project.js";

type Listener<T> = (items: T[]) => void;

class State<T> {
  protected listeners: Listener<T>[] = [];

  addListener(listenerFunction: Listener<T>) {
    this.listeners.push(listenerFunction);
  }
}

export class ProjectState extends State<Project> {
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
      ProjectStatus.ACTIVE,
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

export const projectState = ProjectState.getInstance();