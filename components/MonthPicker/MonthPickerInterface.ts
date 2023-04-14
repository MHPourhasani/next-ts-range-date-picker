import DateObject from "react-date-object";

export interface MonthPickerProps {
	state: StateType;
	onChange: (a: any, b: any) => any;
	sort: any;
	handleFocusedDate: (a: any, b: any) => any;
	handleMonthChange: (a: any) => any;
	rangeHover: any;
}

export type DateType = Date | number | string | DateObject;

export type StateType = {
	date: {
    monthIndex: number;
		year: number;
		month: { index: number; number: number };
		digits: string[];
		toFirstOfMonth(): unknown;
		setMonth(a:any): unknown;
		_format: unknown;
	};
	today: {
		month: any; day: number; year: number 
};
	minDate: {
		monthIndex: number;
		year: number;
	};
	maxDate: {
		monthIndex: number;
		year: number;
	};
	selectedDate: {
		month: any;
		day: number;
		monthIndex: number;
		year: number;
	};
	year: number;
	onlyShowInRangeDates: boolean;
	focused: any;
	calendar: any |;
	locale: any;
};
