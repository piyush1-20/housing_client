import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone:true,
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any[], filterString:string, propName:string): any[] {
    console.log("Filter called")
    console.log(filterString)
    console.log(value);
    const resultArray =[];
    if(value.length===0 || filterString==='' || propName===''){
        return value;
    }
    for(const item of value){
      if(item[propName]===filterString){
          resultArray.push(item);
      }
    }
    console.log("resultArray")
    console.log(resultArray)
    return resultArray;
  }

}
