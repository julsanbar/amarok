import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'habilitado'
})
export class HabilitadoPipe implements PipeTransform {

  transform(value: Boolean, ...args: any[]): String {
    
    const texto: String = (value)?'deshabilitar':'habilitar';

    return texto;

  }

}
