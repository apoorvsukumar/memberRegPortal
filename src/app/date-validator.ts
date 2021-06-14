import { AbstractControl, FormControl } from '@angular/forms';
import * as moment from "moment";

export class DateValidator {
    constructor() {
    }
  
    static date(c: FormControl) {
        if (!c.value) {
            return null;
        }
      return !moment(c.value, 'M/D/YYYY', true).isValid() ? { 'badDateFormat': true } : null;
    }

    

//   static dateVaidator(AC: AbstractControl) {
//     if (AC && AC.value && !moment(AC.value, 'YYYY-MM-DD', true).isValid()) {
//       return { 'dateVaidator': true };
//     }
//     return null;
//   }
}
