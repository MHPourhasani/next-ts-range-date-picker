import { useMemo } from 'react';
import isArray from '../../utils/isArray';
import DateObject from 'react-date-object';

// interface
import { WeekDaysProps } from './WeekDaysInterface';

const WeekDays: React.FC<WeekDaysProps> = ({
	state: {
		date: { calendar, locale },
	},
	customWeekDays,
	weekStartDayIndex,
	className,
}) => {
	let weekDays = useMemo(() => {
		let weekDays:any = customWeekDays;

		if (isArray(weekDays) && weekDays.length >= 7) {
			weekDays.length = 7;

			weekDays = weekDays.map((weekDay: string | any[]) => {
				if (isArray(weekDay) && (weekDay.length > 1)) {
					weekDay = weekDay[1];
				} else if (isArray(weekDay)) {
					weekDay = weekDay[0];
				}

				return weekDay;
			});
		} else {
			weekDays = new DateObject({
				year: 1,
				calendar,
				locale,
			}).weekDays.map((weekDay) => weekDay.shortName);
		}

		return weekDays;
	}, [calendar, locale, customWeekDays]);

	weekDays = [...weekDays]
		.slice(weekStartDayIndex)
		.concat([...weekDays].splice(0, weekStartDayIndex));

	return (
		<div className={className}>
			{weekDays.map((weekDay:string, index:number) => (
				<div key={index} className='flex h-12 w-12 items-center justify-center'>
					{weekDay}
				</div>
			))}
		</div>
	);
};

export default WeekDays;
