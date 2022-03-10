import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterBySection',
  pure: false,
})
export class filterBySection implements PipeTransform {
  transform(items: any[], filter: string): any {
    if (!items || !filter) {
      return items;
    }
    return items.filter(
      (item) => item.section != undefined && item.section.indexOf(filter) !== -1
    );
  }
}
