import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { marked } from 'marked';
import { DynamicNavbarService } from '../../dynamic-navbar.service';
import { ProjectStructureService } from '../../project-structure.service';
import { PrevNextComponent } from "../../prev-next/prev-next.component";

export function rewriteRelativeImagePaths(
  html: string,
  pagePath: string
): string {

  // Determine the base directory of the markdown file
  const basePath = pagePath.substring(0, pagePath.lastIndexOf('/') + 1);

  const doc = new DOMParser().parseFromString(html, 'text/html');

  doc.querySelectorAll('img').forEach(img => {
    const src = img.getAttribute('src');
    if (!src) return;

    // Skip absolute URLs or already-correct paths
    if (
      src.startsWith('http') ||
      src.startsWith('/') ||
      src.startsWith('data:')
    ) {
      return;
    }

    img.setAttribute('src', basePath + src);
  });

  return doc.body.innerHTML;
}

function extractMetadata(mdContent: string): {
  metadata: string | null;
  strippedContent: string;
} {
  const match = mdContent.match(/^---\n([\s\S]*?)\n---\n/);

  if (!match) {
    return { metadata: null, strippedContent: mdContent };
  }

  const yaml = match[1];
  const strippedContent = mdContent.slice(match[0].length);

  const metadataObj: Record<string, unknown> = {};

  yaml.split('\n').forEach(line => {
    const [key, value] = line.split(/:\s*(.+)/);

    if (!key || !value) return;

    try {
      metadataObj[key.trim()] = JSON.parse(value);
    } catch {
      metadataObj[key.trim()] = value.trim();
    }
  });

  return {
    metadata: JSON.stringify(metadataObj, null, 2),
    strippedContent
  };
}

function convertMdToHtml(mdContent: string, title = ''): string {
  const { metadata, strippedContent } = extractMetadata(mdContent);
  return marked.parse(strippedContent) as string;
}

@Component({
  selector: 'app-ostomachion',
  standalone: true,
  imports: [PrevNextComponent],
  templateUrl: './ostomachion.component.html',
  styleUrl: './ostomachion.component.scss'
})
export class OstomachionComponent implements OnInit {
  @ViewChild('content', { static: true })
  content!: ElementRef<HTMLElement>;

  next: string[];
  prev: string[];
  next_title: string;
  prev_title: string;

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectStructureService,
    private navbarService: DynamicNavbarService,
    private http: HttpClient) {
      this.next = [];
      this.prev = [];
      this.next_title = '';
      this.prev_title = '';
  }

  ngOnInit() {

    this.route.paramMap.subscribe(params => {
      let url = params.get('page');
      if(!url){
        url = 'Introduction'
      }
      console.log(url);
      const page = this.projectService.getPage('Ostomachion', url)!;
      const project = this.projectService.getProject('Ostomachion')!;
      const mapped = page.path;
      const title = page.title;
      const index = page.index;
      
    this.navbarService.setTitle("Ostomachion");

      if(index > 0){
        this.prev = ['/Projects/Ostomachion', project.pages[index-1].url];
        this.prev_title = project.pages[index-1].title;
        console.log(this.prev);
        // this.navbarService.setPrev();
      } else {
        this.prev = [];
      }

      if(index < project.pages.length-1){
        
        this.next = ['/Projects/Ostomachion', project.pages[index+1].url];
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

      const page_path = `assets/Ostomachion/${mapped}`

      if(page_path){
        this.loadPage(page_path, title);
      }

    });
  }

  loadPage(page: string, title: string) {
  this.http.get(page, { responseType: 'text' })
    .subscribe(md => {

      // 1 Convert markdown to HTML
      const html = convertMdToHtml(md, title);

      const correctedHtml =
        rewriteRelativeImagePaths(html, page);

      // 2 Inject
      this.content.nativeElement.innerHTML = correctedHtml;

      // 3 Post-process (optional)
      // this.katexRenderer.renderMathInElement(el);

      // el.querySelectorAll('pre code').forEach(block => {
      //   hljs.highlightElement(block as HTMLElement);
      // });

      // numberHeaders();
    });
}



}
