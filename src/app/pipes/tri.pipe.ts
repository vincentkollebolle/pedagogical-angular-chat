import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tri'
})
export class TriPipe implements PipeTransform {
  transform(value: any[], key: string = ''): any[] {
    if (!Array.isArray(value)) return value;

    return value.sort((a, b) => {
      const aValue = key ? String(a[key]).toLowerCase() : String(a).toLowerCase();
      const bValue = key ? String(b[key]).toLowerCase() : String(b).toLowerCase();
      return aValue.localeCompare(bValue);
    });
  }
}
