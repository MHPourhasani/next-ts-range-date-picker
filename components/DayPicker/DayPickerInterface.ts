export interface DayPickerProps {
	state: StateType;
	monthAndYears: any;
	onChange: (a: any, b: any) => any;
	onlyShowInRangeDates: boolean;
	sort: any;
	handleFocusedDate: (a: any, b: any) => any;
	numberOfMonths: number;
	rangeHover: any;
	allDayStyles: string;
	rangeDateStyle: string;
	oneDaySelectStyle: string;
	todayStyle: string;
	startRangeDayStyle: string;
	endRangeDayStyle: string;
}

export type StateType = {
	date: {
		monthIndex: number;
		year: number;
		month: { index: number; number: number };
		digits: string[];
		toFirstOfMonth(): unknown;
		setMonth(): unknown;
		calendar: any;
		locale: any;
		current: any;
		hour: number;
		minute: number;
		second: number;
	};
	onlyMonthPicker: boolean;
	onlyYearPicker: boolean;
	range: any;

	today: { day: number; year: number };
	minDate: {
		monthIndex: number;
		year: number;
	};
	maxDate: {
		monthIndex: number;
		year: number;
	};
	selectedDate: any;
	year: number;
	focused: any;
};
