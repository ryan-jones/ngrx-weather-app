import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalize'
})
export class CapitalizeFirstLetterPipe implements PipeTransform {
  transform(value: string): string {
    if (value && /\s/.test(value)) {
      return value.replace(/\b\w/g, first => first.toLocaleUpperCase());
    }
    return value;
  }
}
