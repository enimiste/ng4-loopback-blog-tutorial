import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'keys',
    pure: true
})
export class KeysPipe implements PipeTransform {
    transform(value: any, args?: any): any {
        if (value == null) return [];
        else return Object.keys(value);
    }

}
