import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { OstomachionProject, LinearProgrammingProject, ProjectConfig, ProjectPageConfig } from './app.routes';

@Injectable({
  providedIn: 'root'
})
export class ProjectStructureService {

  constructor(){
      this.registerProject(OstomachionProject);
      this.registerProject(LinearProgrammingProject);
  }

  private projectsSubject = new BehaviorSubject<Record<string, ProjectConfig>>({});
  projects$ = this.projectsSubject.asObservable();

  registerProject(config: ProjectConfig) {
    const current = this.projectsSubject.value;

    this.projectsSubject.next({
      ...current,
      [config.name]: config
    });
  }

  getProject(key: string): ProjectConfig | undefined {
    return this.projectsSubject.value[key];
  }

  getPage(projectKey: string, pageUrl: string): ProjectPageConfig | undefined {
    const project = this.getProject(projectKey);
    if (!project) return undefined;

    return project.pages.find(p => p.url === pageUrl);
  }

  getAllProjects(): Record<string, ProjectConfig> {
    return this.projectsSubject.value;
  }
}
