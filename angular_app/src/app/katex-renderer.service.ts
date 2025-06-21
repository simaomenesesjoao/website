import { Injectable } from '@angular/core';
import katex from 'katex';

@Injectable({ providedIn: 'root' })
export class KatexRendererService {
  renderMathInElement(el: HTMLElement) {
    const regex = /\$\$([^$]+)\$\$|\$([^$]+)\$/g;

    el.innerHTML = el.innerHTML.replace(regex, (_, displayMath, inlineMath) => {
      const math = displayMath || inlineMath;
      const displayMode = !!displayMath;

      try {
        return katex.renderToString(math, { displayMode, throwOnError: false });
      } catch (err) {
        return math; // fallback to raw text
      }
    });
  }
}
