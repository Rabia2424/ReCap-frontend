import { Pipe, PipeTransform } from '@angular/core';
import { CarDetail } from '../models/car-detail';

@Pipe({
  name: 'filter',
  standalone: true,
})
export class FilterPipe implements PipeTransform {
  transform(value: CarDetail[], filterText: string): CarDetail[] {
    filterText = filterText ? filterText.toLocaleLowerCase() : '';
    return filterText?
    value.filter((c:CarDetail)=>
    (c.carName+ " " + c.brandName + " " + c.colorName + " " + c.modelYear).toLocaleLowerCase().indexOf(filterText)!==-1)
    :value;
  }
}
