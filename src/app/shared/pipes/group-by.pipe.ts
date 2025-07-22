import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'groupBy',
  standalone: true
})
export class GroupByPipe implements PipeTransform {
  transform<T>(collection: T[] | null, property: keyof T): { key: any, items: T[] }[] {
    if (!collection) {
      return [];
    }

    const groupedCollection = collection.reduce((previous, current) => {
      const groupKey = String(current[property]);
      if (!previous[groupKey]) {
        previous[groupKey] = [];
      }
      previous[groupKey].push(current);
      return previous;
    }, {} as { [key: string]: T[] }); // Use index signature

    return Object.keys(groupedCollection).map(key => ({
      key: key,
      items: groupedCollection[key]
    }));
  }
}