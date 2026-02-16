import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProjectStructureService } from '../project-structure.service';
import { ProjectConfig } from '../app.routes';
import { DynamicNavbarService } from '../dynamic-navbar.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule, ],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  
  constructor(
    private projectService: ProjectStructureService
  ){
    this.projects = projectService.getAllProjects();
  }

  private navbarService = inject(DynamicNavbarService);
  title = this.navbarService.title;
  next = this.navbarService.next;
  prev = this.navbarService.prev;

  isOpen = false;
  activeMain: string | null = null;
  activeProject: string | null = null;

  projects: Record<string, ProjectConfig>;

  toggleMenu() {
    this.isOpen = !this.isOpen;
  }

  toggleMain(section: string) {
    this.activeMain = this.activeMain === section ? null : section;
  }

  toggleProject(project: string) {
    this.activeProject = this.activeProject === project ? null : project;
  }

  onPress() {
    // this.isOpen = false;
  }
}
