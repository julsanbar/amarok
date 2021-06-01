import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tipo'
})
export class TipoPipe implements PipeTransform {

  transform(value: String, ...args: string[]): String {

    let formateo!:String;

    if(value !== undefined){

      if(args[0] === 'licencia'){

        switch (value) {
          case 'null':
          
            formateo = 'Sin licencia';
    
            break;
        
          case 'competicion':
          
              formateo = 'Competición';
      
            break;
    
          case 'seguridad':
          
              formateo = 'Seguridad';
        
          break;
    
          case 'fuego':
          
            formateo = 'Fuego';
      
            break;
    
        }

      }else{

        formateo = value.charAt(0).toLocaleUpperCase()+value.slice(1);

      }

    }else{

      formateo = '';

    }

    return formateo;
    
  }

}
