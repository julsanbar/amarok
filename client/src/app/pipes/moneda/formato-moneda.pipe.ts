import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatoMoneda'
})
export class FormatoMonedaPipe implements PipeTransform {

  transform(value: Number, ...args: String[]): String {

    const moneda: String = value+" "+args[0];

    return moneda;
  }

}
