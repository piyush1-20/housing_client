import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone:true,
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any[], filterString:string, propName:string): any[] {
    filterString = filterString.toLowerCase();
    const resultArray =[];
    if(value.length===0 || filterString==='' || propName===''){
        return value;
    }
    for(const item of value){
      const v = item[propName].toLowerCase();
      if(v===filterString){
          resultArray.push(item);
      }
    }
    // console.log("resultArray")
    // console.log(resultArray)
    return resultArray;
  }

}
