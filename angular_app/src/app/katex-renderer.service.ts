import { Injectable } from '@angular/core';
import katex from 'katex';

@Injectable({ providedIn: 'root' })
export class KatexRendererService {

  renderMathInElement(el: HTMLElement) {
  // Render <script type="math/tex"> blocks
   const scripts = el.querySelectorAll<HTMLScriptElement>(
  'script[type^="math/tex"]'
  );

  scripts.forEach(script => {
    const tex = script.textContent ?? '';
    const displayMode = script.type.includes('mode=display');

    const html = katex.renderToString(tex, {
      displayMode,
      throwOnError: false
    });

    const span = document.createElement('span');
    span.innerHTML = html;
    script.replaceWith(span);
  });

    // Render $...$ and $$...$$ in remaining text
    const regex = /\$\$([^$]+)\$\$|\$([^$]+)\$/g;

    el.innerHTML = el.innerHTML.replace(regex, (_, displayMath, inlineMath) => {
      const math = displayMath || inlineMath;
      const displayMode = !!displayMath;

      try {
        return katex.renderToString(math, {
          displayMode,
          throwOnError: false
        });
      } catch {
        return math;
      }
    });
  }
}
