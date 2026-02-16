import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import hljs from 'highlight.js';

import { DynamicNavbarService } from '../../dynamic-navbar.service';
import { KatexRendererService } from '../../katex-renderer.service';
import { init } from '../../../../external/LinearProgramming/dist/main'

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
  templateUrl: 'linear-programming.html',
})
export class LinearProgrammingComponent implements OnInit {
  @ViewChild('htmlContainer', { static: true })
  htmlContainer!: ElementRef<HTMLElement>;

  constructor(
    private http: HttpClient,
    private katexRenderer: KatexRendererService,
    private navbarService: DynamicNavbarService
  ) {}

  ngOnInit(){

    this.navbarService.setTitle("Linear Programming");
    
    this.http
      .get('assets/LinearProgramming/index.html', { responseType: 'text' })
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
    link.href = 'assets/LinearProgramming/main.css';
    document.head.appendChild(link);
  }

}
