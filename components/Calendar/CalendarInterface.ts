export interface CalendarProps {
	value: any;
	calendar: any;
	locale: any;
	customWeekDays: string[];
	weekStartDayIndex: number;
	children: any;
	onChange: (a: any) => any;
	minDate: any;
	maxDate: any;
  range:any
	disableMonthPicker: any;
	onReady: () => any;
	sort: any;
	DatePicker: any;
	datePickerProps: any;
	currentDate: any;
	onMonthChange: (a: any) => any;
	onFocusedDateChange: (a: any) => any;
	rangeHover: any;
	className: string;
	oneDaySelectStyle: string;
	calendarStyle: string;
	todayStyle: string;
	allDayStyles: string;
	selectedDayStyle: string;
	ref: any;
	rangeDateStyle: string;
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
	};
	today: any;
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
};
