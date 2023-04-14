export interface WeekDaysProps {
	state: StateType;
	customWeekDays: string[];
	weekStartDayIndex: number;
	className: string;
}

export type StateType = {
	date: {
		calendar: any;
		locale: any;
	};
};
