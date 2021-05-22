import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatoFecha'
})
export class FormatoFechaPipe implements PipeTransform {

  transform(value: Date, ...args: String[]): String {

    const fecha = value.toString().substring(0,10)+" "+value.toString().substring(11,19);

    return fecha;
  }

}
