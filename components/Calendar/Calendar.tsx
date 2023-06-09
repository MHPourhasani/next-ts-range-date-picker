import { useState, useEffect, forwardRef, useRef } from 'react';
import Image from 'next/image';
import DateObject from 'react-date-object';

import DayPicker from '../DayPicker/DayPicker';
import Header from '../Header/Header';
import toDateObject from '../../utils/toDateObject';
import isArray from '../../utils/isArray';
import toLocaleDigits from '../../common/toLocaleDigits';

import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';

// interface
import { CalendarProps } from './CalendarInterface';

// styles
import '../../styles/calendar.module.css';

// icons
import CalendarIcon from '../../assets/svg/calendar.svg';

const Calendar: React.FC<CalendarProps> = ({
	value,
	children,
	onChange,
	minDate,
	maxDate,
	onReady,
	range,
	sort = undefined,
	todayStyle,
	calendarStyle,
	currentDate,
	onMonthChange,
	onFocusedDateChange,
	rangeHover,
	oneDaySelectStyle,
	rangeDateStyle,
	allDayStyles,
	startRangeDayStyle,
	endRangeDayStyle,
}) => {
	const numberOfMonths = 2,
		onlyShowInRangeDates = true;

	let calendar = persian,
		locale = persian_fa;

	if (currentDate && !(currentDate instanceof DateObject)) {
		currentDate = undefined;
	}

	let [state, setState] = useState({}),
		listeners = {},
		ref = useRef<any>({ mustCallOnReady: true, currentDate });

	useEffect(() => {
		setState((state: any) => {
			let { currentDate } = ref.current;
			let { date, selectedDate, initialValue, focused, mustSortDates } = state;

			const checkDate = (date: any) => {
				if (!date) return;
				if (date.calendar.name !== calendar.name) date.setCalendar(calendar);
				if (date.locale.name !== locale.name) date.setLocale(locale);

				return date;
			};

			const getDate = (value: any) => {
				return new DateObject(currentDate || value);
			};

			if (!value) {
				if (!date) date = getDate({ calendar, locale });
				if (initialValue) selectedDate = undefined;
			} else {
				selectedDate = getSelectedDate(value, calendar, locale);

				if (isArray(selectedDate)) {
					if (!date) date = getDate(selectedDate[0]);
				} else {
					if (!date || numberOfMonths === 2) {
						date = getDate(selectedDate);
					} else {
						let min = new DateObject(date).toFirstOfMonth();
						let max = new DateObject(date)
							.add(numberOfMonths - 1, 'months')
							.toLastOfMonth();

						if (selectedDate < min || selectedDate > max) {
							date = new DateObject(selectedDate);
						}
					}
				}
			}

			[].concat(selectedDate).forEach(checkDate);

			checkDate(date);

			if (range || isArray(value)) {
				if (!selectedDate) selectedDate = [];
				if (!isArray(selectedDate)) selectedDate = [selectedDate];

				if (range && selectedDate.length > 2) {
					let lastItem = selectedDate[selectedDate.length - 1];

					selectedDate = [selectedDate[0], lastItem];
					focused = lastItem;
				}

				if (range) {
					selectedDate.sort((a: number, b: number) => a - b);
				}
			} else if (isArray(selectedDate)) {
				selectedDate = selectedDate[selectedDate.length - 1];
			}

			delete ref.current.currentDate;

			return {
				...state,
				date,
				selectedDate,
				range,
				initialValue: state.initialValue || value,
				value,
				focused,
				calendar,
				locale,
				mustSortDates,
				year: date.year,
				today: state.today || new DateObject({ calendar }),
			};
		});
	}, [value, calendar, locale, range, sort, numberOfMonths]);

	useEffect(() => {
		if (!minDate && !maxDate) return;

		setState((state: any) => {
			let { calendar, locale } = state;

			let [selectedDate, $minDate, $maxDate] = getDateInRangeOfMinAndMaxDate(
				getSelectedDate(value, calendar, locale),
				minDate,
				maxDate,
				calendar
			);

			return {
				...state,
				inRangeDates: onlyShowInRangeDates ? selectedDate : state.selectedDate,
				minDate: $minDate,
				maxDate: $maxDate,
			};
		});
	}, [minDate, maxDate, onlyShowInRangeDates, value]);

	if (state.today && !ref.current.isReady) ref.current.isReady = true;

	useEffect(() => {
		if (ref.current.isReady && ref.current.mustCallOnReady && onReady instanceof Function) {
			ref.current.mustCallOnReady = false;

			onReady();
		}
	}, [ref.current.isReady, onReady]);

	let globalProps = {
			state,
			setState,
			onChange: handleChange,
			sort,
			handleFocusedDate,
			monthAndYears: getMonthsAndYears(),
			rangeHover,
		},
		{ datePickerProps, DatePicker, ...calendarProps } = (...args: any[]) => args[0];

	return (
		state.today && (
			// rmdp-calendar
			<section
				ref={setRef}
				className={`flex w-full flex-col justify-center p-1 ${calendarStyle}`}>
				<section className='flex'>
					<div className='flex gap-2 text-14'>
						<Image src={CalendarIcon} alt='Calendar icon' />
						<span>از:</span>
						<span>22:00</span>
					</div>
				</section>

				<Header
					{...globalProps}
					calendar={undefined}
					locale={undefined}
					disabled={false}
					handleMonthChange={(date) => onMonthChange?.(date)}
				/>

				<DayPicker
					{...globalProps}
					onlyShowInRangeDates={onlyShowInRangeDates}
					numberOfMonths={numberOfMonths}
					oneDaySelectStyle={oneDaySelectStyle}
					allDayStyles={allDayStyles}
					todayStyle={todayStyle}
					rangeDateStyle={rangeDateStyle}
					startRangeDayStyle={startRangeDayStyle}
					endRangeDayStyle={endRangeDayStyle}
				/>
				{children}
			</section>
		)
	);

	function handleChange(selectedDate, state) {
		//This one must be done before setState
		if (selectedDate || selectedDate === null) {
			if (listeners.change) listeners.change.forEach((callback) => callback(selectedDate));
		}

		if (state) setState(state);
		if (selectedDate || selectedDate === null) onChange?.(selectedDate);
	}

	function handleFocusedDate(focused, clicked) {
		onFocusedDateChange?.(focused, clicked);
	}

	function setRef(element: any) {
		if (element) {
			element.date = state.date;

			element.set = function (key, value) {
				setState({
					...state,
					date: new DateObject(state.date.set(key, value)),
				});
			};
		}

		ref.current.Calendar = element;
	}

	function getMonthsAndYears() {
		let date = state.date;

		if (!date) return [];

		let monthNames = [],
			years = [],
			digits = date.digits;

		for (let monthIndex = 0; monthIndex < numberOfMonths; monthIndex++) {
			let monthName,
				year = date.year,
				index = date.monthIndex + monthIndex;

			if (index > 11) {
				index -= 12;
				year++;
			}

			monthName = date.months[index].name;

			year = toLocaleDigits(year.toString(), digits);

			monthNames.push(monthName);
			years.push(year);
		}

		return [monthNames, years];
	}
};

function getDateInRangeOfMinAndMaxDate(date, minDate, maxDate, calendar) {
	if (minDate)
		minDate = toDateObject(minDate, calendar).set({
			hour: 0,
			minute: 0,
			second: 0,
			millisecond: 0,
		});
	if (maxDate)
		maxDate = toDateObject(maxDate, calendar).set({
			hour: 23,
			minute: 59,
			second: 59,
			millisecond: 999,
		});

	if (isArray(date)) {
		date = date.filter((dateObject: any) => {
			if (minDate && dateObject < minDate) return false;
			if (maxDate && dateObject > maxDate) return false;

			return true;
		});
	}

	return [date, minDate, maxDate];
}

function getSelectedDate(value: any, calendar: any, locale: any) {
	let selectedDate = []
		.concat(value)
		.map((date) => {
			if (!date) return {};
			if (date instanceof DateObject) return date;

			return new DateObject({ date, calendar, locale });
		})
		.filter((date) => date.isValid);

	return isArray(value) ? selectedDate : selectedDate[0];
}

export default Calendar;
