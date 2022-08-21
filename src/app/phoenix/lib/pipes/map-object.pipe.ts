import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mapObject',
  standalone: true
})
export class MapObjectPipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): {key: string, value: any}[] {
    if (typeof value !== 'object') {
      throw new Error('Value is not an object');
    }
    return Object.keys(value).map(key => ({
      key,
      value: value[key] ? value[key] : null
    }));
  }

}
