import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone:true,
  name: 'sort',
  pure:true
})
export class SortPipe implements PipeTransform {

  transform(value: Array<string>, args: any[]): any {
     const sortField = args[0];
     const sortOrder = args[1];
     let mult =1;
     if(sortOrder==='desc'){
      mult=-1;
     }
    //  const sortArray = [...value]
    value.sort((a:any,b:any)=>{
      if(a[sortField]<b[sortField]){
        return -1*mult;
      }else if(a[sortField]>b[sortField]){
        return 1*mult;
      }
      return 0;
    });
    return value;
  }

}
