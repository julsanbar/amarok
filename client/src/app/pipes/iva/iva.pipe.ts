import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'iva'
})
export class IvaPipe implements PipeTransform {

  transform(value: number, ...args: number[]): number {
    
    return Number.parseFloat((((value*args[0])/100)+value).toFixed(2));

  }

}
