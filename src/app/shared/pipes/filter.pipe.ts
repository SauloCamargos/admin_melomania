import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterList',
  pure: false
})
export class FilterListPipe implements PipeTransform {

  transform(items: any[], filter: any): any[] {
    if (!items || !filter) {
      return items;
    }
    // filter items array, items which match and return true will be kept, false will be filtered out
    return items.filter((item: any) => this.applyFilter(item, filter));
  }

  applyFilter(book: any, filter: any): boolean {
    for (let field in filter) {
      if (filter[field]) {
        if(book[field] == null || book[field] == undefined){
          return false;
        }
        if (typeof filter[field] === 'string') {
          if (book[field].toLowerCase().indexOf(filter[field].toLowerCase()) === -1) {
            return false;
          }
        } else if (typeof filter[field] === 'number') {
          if (book[field] !== filter[field]) {
            return false;
          }
        }
      }
    }
    return true;
  }

}
