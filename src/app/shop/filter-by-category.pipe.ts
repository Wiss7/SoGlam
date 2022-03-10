import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterByCategory',
  pure: false,
})
export class filterByCategory implements PipeTransform {
  transform(items: any[], filter: string): any {
    if (!items || !filter) {
      return items;
    }
    return items.filter((item) => item.type.indexOf(filter) !== -1);
  }
}
