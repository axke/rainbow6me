import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nameFilter'
})
export class NameFilterPipe implements PipeTransform {

  transform(items: any[], filter: string): any {
    if (!items || !filter) {
      return items;
    }
    return items.filter(item => item.name.toLowerCase().indexOf(filter.toLowerCase()) !== -1);
  }

}
