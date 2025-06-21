import { Component, OnInit, signal, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { KatexRendererService } from '../katex-renderer.service';
import hljs from 'highlight.js';

@Component({
  selector: 'app-project-viewer',
  standalone: true,
  imports: [HttpClientModule, CommonModule, RouterLink],
  templateUrl: './project-viewer.component.html',
  styleUrl: './project-viewer.component.scss'
})

export class ProjectViewerComponent implements OnInit {
  
  @ViewChild('htmlContainer') htmlContainer!: ElementRef;
  htmlContent = signal('');
  projects = signal<{ project: string, chapters: { chapter: string, page: string }[] }[]>([]);
  previous = signal<{ project: string; chapter: string; page: string } | null>(null);
  next = signal<{ project: string; chapter: string; page: string } | null>(null);


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private katexRenderer: KatexRendererService,
    private cdr: ChangeDetectorRef
  ) {

        console.log("entering fetch from project-viewer");
      fetch('assets/project-index.json').then(res => res.json()).then(data => {
        this.projects.set(data);
        const urlSegments = this.router.url.split('/').filter(Boolean);
        this.set_location(urlSegments);
        console.log("prev: ",this.previous());
        console.log("next: ", this.next());
        console.log("exiting fetch from project-viewer");
      });

  }

  set_location(urlSegments: string[]): void {
        const project = urlSegments[0] || null;
        const chapter = urlSegments[1] || null;
        const page = urlSegments[2] || null;

        console.log(urlSegments);
        console.log('Project:', project);
        console.log('Chapter:', chapter);

          console.log("Routing: ", project, chapter, page);
          if(project && chapter && page){
            console.log("parsable")

            const projects = this.projects();
            console.log(projects);
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

            console.log("index prev:", prev);
            console.log("index next:", next);
            if (prev){
              console.log("prev not null");
              this.previous.set({ project: project, chapter: prev.chapter, page: prev.page });
            } else {
              console.log("prev null");
              this.previous.set(null);
            }

            if (next) { 
              console.log("next not null");
              this.next.set({ project: project, chapter: next.chapter, page: next.page });
            } else {
              console.log("next null");
              this.next.set(null);
            }

          } else {
            this.previous.set(null);
            this.next.set(null);
          }
          
  }
  
  ngOnInit() {

    this.route.paramMap.subscribe(params => {
      const project = params.get('project');
      const chapter = params.get('chapter');
      const page = params.get('page');
      
      if (project && chapter && page) {
        const path = `assets/projects/${project}/${chapter}/${page}.html`;

        this.http.get(path, { responseType: 'text' })
          .subscribe({
            next: content => {
              this.htmlContent.set(content);

            setTimeout(() => {
                    
              this.cdr.detectChanges();  // ensure DOM reflects htmlContent()
              if (this.htmlContainer?.nativeElement) {
                this.katexRenderer.renderMathInElement(this.htmlContainer.nativeElement);
              }

              if (this.htmlContainer?.nativeElement) {
              this.htmlContainer.nativeElement
                .querySelectorAll('pre code')
                .forEach((block: HTMLElement) => {
                  hljs.highlightElement(block);
                });
            }
            
            });

            },
            error: () => this.htmlContent.set('<p>Page not found.</p>')

            
          });

        const urlSegments = this.router.url.split('/').filter(Boolean);
        this.set_location(urlSegments);

      }
    });
  }
  

}