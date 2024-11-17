import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'categoryTransform',
  standalone: true
})
export class CategoryTransformPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return '';
    return value
      .replace('-', ' & ')
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
}
