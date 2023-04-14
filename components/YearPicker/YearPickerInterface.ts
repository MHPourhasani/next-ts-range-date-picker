export interface YearPickerProps {
  state: StateType;
  calendar: any;
  locale: any;
  onChange: (a: any, b: any) => any;
  handleFocusedDate: (a: any, b: any) => any;
  onYearChange: (a: any, b: any) => any;
}

export type StateType = {
  date: {
    monthIndex: number;
    year: number;
    month: { index: number; number: number };
    digits: string[];
    toFirstOfMonth(): unknown;
    setMonth(): unknown;
  };
  today: { day: number; year: number };
  minDate: {
    monthIndex: number;
    year: number;
  };
  maxDate: {
    monthIndex: number;
    year: number;
  };
  selectedDate: {
    day: number;
    monthIndex: number;
    year: number;
  };
  year: number;
  onlyShowInRangeDates:boolean
};
