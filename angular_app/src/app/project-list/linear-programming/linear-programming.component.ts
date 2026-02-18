import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import hljs from 'highlight.js';

import { ActivatedRoute } from '@angular/router';
import { DynamicNavbarService } from '../../dynamic-navbar.service';
import { KatexRendererService } from '../../katex-renderer.service';
import { ProjectStructureService } from '../../project-structure.service';
import { init } from '../../../../external/LinearProgramming/dist/documents/main'
import { PrevNextComponent } from "../../prev-next/prev-next.component";

function numberHeaders(){
  let h2Count = 0;
  let h3Count = 0;

  document.querySelectorAll(".content h2, .content h3").forEach(el => {
  console.log("numbering script running");
    if (el.tagName === "H2") {
      h2Count++;
      h3Count = 0;
      el.textContent = `${h2Count}. ${el.textContent}`;
    }

    if (el.tagName === "H3") {
      h3Count++;
      el.textContent = `${h2Count}.${h3Count} ${el.textContent}`;
    }
  });
}

@Component({
  selector: 'app-pivot-latex',
  standalone: true,
  imports: [PrevNextComponent],
  templateUrl: 'linear-programming.html',
})
export class LinearProgrammingComponent implements OnInit {
  @ViewChild('content', { static: true })
  htmlContainer!: ElementRef<HTMLElement>;

  next: string[];
  prev: string[];
  next_title: string;
  prev_title: string;

  constructor(
      private route: ActivatedRoute,
      private projectService: ProjectStructureService,
      private katexRenderer: KatexRendererService,  
      private navbarService: DynamicNavbarService,
      private http: HttpClient) {
        this.next = [];
        this.prev = [];
        this.next_title = '';
        this.prev_title = '';
    }

  ngOnInit(){
    this.route.paramMap.subscribe(params => {
      let url = params.get('page');
      if(!url){
        url = 'Introduction'
      }
      console.log(url);
      const page = this.projectService.getPage('Linear Programming', url)!;
      const project = this.projectService.getProject('Linear Programming')!;
      const mapped = page.path;
      const title = page.title;
      const index = page.index;
      
    this.navbarService.setTitle("Linear Programming");

      if(index > 0){
        this.prev = ['/Projects/LinearProgramming', project.pages[index-1].url];
        this.prev_title = project.pages[index-1].title;
        console.log(this.prev);
        // this.navbarService.setPrev();
      } else {
        this.prev = [];
      }

      if(index < project.pages.length-1){
        
        this.next = ['/Projects/LinearProgramming', project.pages[index+1].url];
        this.next_title = project.pages[index+1].title
        console.log(this.next);
        // this.navbarService.setNext();
      } else {
        this.next = [];
      }

      if (!mapped || !title) {
        console.error('Page not found:', url);
        return;
      }

      const page_path = `assets/LinearProgramming/${mapped}`

      this.http
        .get(page_path, { responseType: 'text' })
        .subscribe(html => {
          const el = this.htmlContainer.nativeElement;

          el.innerHTML = html;
          this.katexRenderer.renderMathInElement(el);
          
          el.querySelectorAll('pre code').forEach(block => {
              hljs.highlightElement(block as HTMLElement);
            });

          init();
          numberHeaders();
        });

      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'assets/LinearProgramming/documents/style.css';
      document.head.appendChild(link);
    });    
  }
}
