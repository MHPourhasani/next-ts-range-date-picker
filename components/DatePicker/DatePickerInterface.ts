export interface DatePickerProps {
	value: any;
	format: string;
	onChange: (a: any) => any;
	onReady: (a?: any) => any;
	name: string;
	required: boolean;
	className: string;
	inputClass: string;
	disabled: boolean;
	render: any;
	weekDays: string[];
	months: string[];
	children: any;
	inputMode: any;
	hideOnScroll: boolean;
	minDate: any;
	maxDate: any;
	containerClassName: string;
	calendarPosition: string;
	editable: boolean;
	onOpen: () => any;
	onClose: () => any;
	zIndex: number;
	arrow: boolean;
	fixMainPosition: any;
	onPropsChange: any;
	digits: any;
	onFocusedDateChange: (a:any) => any;
	type: any;
	onOpenPickNewDate: boolean;
	inputLabel: string;
	inputLabelClassname: string;
	inputClassname: string;
	selectedDayStyle: string;
	customWeekDays: string[];
	weekStartDayIndex: number;
	disableMonthPicker: any;
	oneDaySelectStyle: string;
	rangeDateStyle:string
	calendarStyle: string;
	todayStyle: string;
	allDayStyles: string;
	startRangeDayStyle: string;
	endRangeDayStyle: string;
	calendar: undefined;
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
};
