import { Component, signal } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [HttpClientModule, CommonModule, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  projects = signal<{ project: string, chapters: { chapter: string, page: string }[] }[]>([]);
  current = signal<string | null>("Ostomachion");
  
  previous = signal<{ project: string; chapter: string; page: string } | null>(null);
  next = signal<{ project: string; chapter: string; page: string } | null>(null);

  set_location(urlSegments: string[]): void {
    const project = urlSegments[0] || null;
        const chapter = urlSegments[1] || null;
        const page = urlSegments[2] || null;

        // console.log(urlSegments);
        // console.log('Project:', project);
        // console.log('Chapter:', chapter);
        this.current.set(project);

          // console.log("Routing: ", project, chapter, page);
          if(project && chapter && page){
            // console.log("parsable")

            const projects = this.projects();
            // console.log(projects);
            const proj = projects.find(p => p.project === project);
            if (!proj){
              console.log("Project not found");
              return;
            }


            const idx = proj.chapters.findIndex(c => c.chapter === chapter);
            if (idx === -1){
              console.log("idx == -1");
              return;
            }

            // previous chapter or null
            const prev = idx > 0 ? proj.chapters[idx - 1] : null;
            // next chapter or null
            const next = idx < proj.chapters.length - 1 ? proj.chapters[idx + 1] : null;

            if (prev){
              this.previous.set({ project: project, chapter: prev.chapter, page: prev.page });
            } else {
              this.previous.set(null);
            }
            if (next) { 
              this.next.set({ project: project, chapter: next.chapter, page: next.page });
            } else {
              this.next.set(null);
            }

          } else {
            this.previous.set(null);
            this.next.set(null);
          }
          
  }

  constructor(
      private route: ActivatedRoute,
      private router: Router ) {
        // console.log("constructor");

      fetch('assets/project-index.json').then(res => res.json()).then(data => {
        this.projects.set(data);
        const urlSegments = this.router.url.split('/').filter(Boolean);
        this.set_location(urlSegments);

        
        // console.log("Set data");
        // console.log(this.projects());
      this.router.events.pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        const urlSegments = this.router.url.split('/').filter(Boolean);
          this.set_location(urlSegments);
        });

        // console.log("subscription done");
      });
    }
}
