import { Injectable } from '@angular/core';

import * as marked from 'marked';

@Injectable({
  providedIn: 'root'
})
export class RendererService {

  private renderer: any;

  constructor() {
    this.renderer = this.getCustomRenderer();
  }

  private getCustomRenderer(): marked.Renderer {
    const renderer = new marked.Renderer();

    // custom inline image formatter
    renderer.strong = (text: string) => {
      if (text.includes(':')) {
        const [type, subtype] = text.split(':');

        return `<img src="assets/inicon/${type}-${subtype}.png" class="inline-icon" />`;
      }

      return `<strong>${text}</strong>`;
    };

    renderer.paragraph = (text: string) => {
      return `<p class="paragraph">${text}</p>`
    }

    return renderer;
  }

  public formatString(str: string): string {
    if (!str) { return ''; }
    return marked(str, { renderer: this.renderer });
  }

}
