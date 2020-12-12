import { Pipe, PipeTransform } from '@angular/core';
import { RendererService } from './renderer.service';

@Pipe({
  name: 'format'
})
export class FormatPipe implements PipeTransform {

  constructor(private rendererService: RendererService) {}

  transform(value: any, ...args: any[]): any {
    return this.rendererService.formatString(value);
  }

}
