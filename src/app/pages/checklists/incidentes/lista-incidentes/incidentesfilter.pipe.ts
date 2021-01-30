import { Pipe, PipeTransform } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Pipe({
  name: 'filter'
})
export class IncidentesFilterPipe implements PipeTransform {

    private _total$ = new BehaviorSubject<number>(0);
  transform(items: any[], searchText: string): any[] {
    if (!items) return [];
    if (!searchText) return items;

    return items.filter(item => {
      return Object.keys(item).some(key => {
        this._total$.next(item.length);
        return String(item[key]).toLowerCase().includes(searchText.toLowerCase());
      });
    });
   }
}
