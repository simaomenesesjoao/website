import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutMeComponent } from './about-me/about-me.component';
import { ContactComponent } from './contact/contact.component';
import { ProjectViewerComponent } from './project-viewer/project-viewer.component';
import { ProjectsComponent } from './projects/projects.component';

export const routes: Routes = [
    { path: '', component: HomeComponent},
    { path: 'Home', component: HomeComponent},
    { path: 'About', component: AboutMeComponent},
    { path: 'Contact', component: ContactComponent},
    { path: 'Projects', component: ProjectsComponent},
    { path: ':project/:chapter/:page', component: ProjectViewerComponent}
];
