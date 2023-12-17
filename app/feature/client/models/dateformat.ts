import {MatDateFormats, NativeDateAdapter} from "@angular/material/core";

export class CustomDateAdapter extends NativeDateAdapter {
  override format(date: Date, displayFormat: Object): string {
    if (displayFormat === 'input') {
      // Format the date as 'MM/DD/YYYY' and include the current year
      const day = date.getDate();
      const month = date.getMonth() + 1; // Months are zero-based
      const year = new Date().getFullYear();

      return `${month}/${day}/${year}`;
    } else {
      return date.toDateString();
    }
  }
}

export const MY_DATE_FORMATS: MatDateFormats = {
  parse: {
    dateInput: { month: 'short', year: 'numeric', day: 'numeric' },
  },
  display: {
    dateInput: 'input',
    monthYearLabel: { year: 'numeric', month: 'short' },
    dateA11yLabel: { year: 'numeric', month: 'long', day: 'numeric' },
    monthYearA11yLabel: { year: 'numeric', month: 'long' },
  },
};
