import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutMeComponent } from './about-me/about-me.component';
import { ContactComponent } from './contact/contact.component';

import { ProjectsComponent } from './projects/projects.component';
import { LinearProgrammingComponent } from './project-list/linear-programming/linear-programming.component';
import { OstomachionComponent } from './project-list/ostomachion/ostomachion.component';


export interface ProjectPageConfig {
  url: string; // important for routing
  path: string;
  title: string;
  index: number;
}

export interface ProjectConfig {
  url: string; // important for routing
  name: string;
  pages: ProjectPageConfig[];
}

export const OstomachionProject: ProjectConfig = {
  url: 'Ostomachion',
  name: 'Ostomachion',
  pages: [
    { 
      url: 'Introduction',
      path: 'chapter_1/1. Introduction.md',
      title: 'Introduction',
      index: 0
    },
    {
      url: 'Algorithm',
      path: 'chapter_2/2. Algorithm.md',
      title: 'Algorithm',
      index: 1
    },
    {
      url: 'GeometricRepresentation',
      path: 'chapter_3/3. Geometric Representation.md',
      title: 'Geometric Representation',
      index: 2
    },
    {
      url: 'PolygonOverlap',
      path: 'chapter_4/4. Polygon Overlap.md',
      title: 'Polygon Overlap',
      index: 3
    }]
};


export const LinearProgrammingProject: ProjectConfig = {
  url: 'LinearProgramming',
  name: 'Linear Programming',
  pages: [
    {
      url: 'LinearProgramming',
      path: 'index.html',
      title: 'Linear Programming',
      index: 0
    }]
};

export const routes: Routes = [
    { path: '', component: HomeComponent},
    { path: 'Home', component: HomeComponent},
    { path: 'About', component: AboutMeComponent},
    { path: 'Contact', component: ContactComponent},
    { path: 'Projects', component: ProjectsComponent},
    { path: 'Projects/LinearProgramming', component: LinearProgrammingComponent},
    { path: 'Projects/LinearProgramming/:page', component: LinearProgrammingComponent},
    { path: 'Projects/Ostomachion', component: OstomachionComponent},
    { path: 'Projects/Ostomachion/:page', component: OstomachionComponent},
];
