export interface HeaderProps {
	state: StateType;
	setState: any;
	calendar: any;
	locale: any;
	onChange: (a: any, b: any) => any;
	handleMonthChange: (a: any, b: any) => any;
	monthAndYears: any[];
	disabled: boolean;
}

export type StateType = {
	date: {
		monthIndex: number;
		year: number;
		month: any;
		digits: string[];
		toFirstOfMonth(): any;
		setMonth(): any;
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
		month: { name: string };
	};
	year: number;
	calendar: any;
	locale: any;
};
