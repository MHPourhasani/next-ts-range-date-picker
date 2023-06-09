import { Fragment, useMemo, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import Image from 'next/image';
import DateObject from 'react-date-object';

import selectDate from '../../utils/selectDate';
import isSameDate from '../../utils/isSameDate';
import getRangeClass from '../../utils/getRangeClass';
import isArray from '../../utils/isArray';
import getRangeHoverClass from '../../utils/getRangeHoverClass';

// interface
import { MonthPickerProps, StateType } from './MonthPickerInterface';

// icons
import ArrowDown from '../../assets/svg/arrow-down.svg';

// styles
import styles from '../../styles/scrollbar.module.css';

const MonthPicker: React.FC<MonthPickerProps> = ({
	state,
	onChange,
	sort,
	handleMonthChange,
	handleFocusedDate,
	rangeHover,
}) => {
	const {
			date,
			today,
			minDate,
			maxDate,
			calendar,
			locale,
			selectedDate,
			onlyShowInRangeDates,
		}: StateType = state,
		[dateHovered, setDateHovered] = useState<any>();

	// const [selectedMonth, setSelectedMonth] = useState(today.month.name);
	const [selectedMonth, setSelectedMonth] = useState<any>(
		new DateObject({ calendar: calendar }).month.name
	);
	console.log(selectedMonth);

	const months = useMemo(() => {
		let months: string | any[] = [],
			monthsArray = [],
			index = 0,
			date = new DateObject({
				calendar,
				locale,
				format: state.date._format,
				year: state.date.year,
				month: 1,
				day: 1,
			});

		if (isArray(months) && months.length >= 12) {
			months.length = 12;

			months = months.map((month) => (isArray(month) ? month[0] : month));
		} else {
			months = date.locale.months.map(([month]) => month);
		}

		let array = [];
		for (let i = 0; i < 12; i++) {
			array.push({
				date: new DateObject(date),
				name: months[index],
			});

			index++;
			date.add(1, 'month');
		}

		monthsArray.push(array);

		return monthsArray;
	}, [calendar, locale, state.date.year, state.date._format]);
	console.log(months);

	const selectMonth = (dateObject: any) => {
		let { selectedDate, focused }: StateType = state,
			{ year, monthIndex } = dateObject;

		if (
			(minDate && year <= minDate.year && monthIndex < minDate.monthIndex) ||
			(maxDate && year >= maxDate.year && monthIndex > maxDate.monthIndex)
		)
			return;

		date.setMonth(monthIndex + 1);

		handleMonthChange(date);

		onChange(undefined, {
			...state,
			date,
			focused,
			selectedDate,
			mustShowMonthPicker: false,
		});
	};

	const getClassName = (dateObject: any) => {
		let names = ['rmdp-day relative px-3 py-2 cursor-pointer'],
			{ year, monthIndex } = dateObject,
			{ selectedDate } = state;

		if (
			(minDate &&
				(year < minDate.year ||
					(year === minDate.year && monthIndex < minDate.monthIndex))) ||
			(maxDate &&
				(year > maxDate.year || (year === maxDate.year && monthIndex > maxDate.monthIndex)))
		)
			// names.push('rmdp-disabled text-gray-400');
			names.push('text-disable');

		if (names.includes('text-disable') && onlyShowInRangeDates) return; // rmdp-disabled

		if (isSameDate(today, dateObject, true)) names.push('text-primary'); // rmdp-today

		// 	names.push(getRangeClass(dateObject, selectedDate, true));

		// 	names = names.concat(
		// 		getRangeHoverClass(dateObject, selectedDate, dateHovered, rangeHover, 'month')
		// 	);

		// names.push(getRangeClass(dateObject, selectedDate, true));
		names.push(getRangeClass(dateObject, selectedDate));

		names = names.concat(
			getRangeHoverClass(dateObject, selectedDate, dateHovered, rangeHover, 'month')
		);

		// if (!onlyMonthPicker) {
		// 	if (date.monthIndex === monthIndex)
		// 		names.push('rmdp-selected bg-primary text-white rounded-md');
		// }

		return names.join(' ');
	};

	// console.log(date.name);

	return (
		<div>
			<Listbox
				value={selectedDate.month !== today.month ? selectedDate.month : selectedMonth}
				onChange={(e) => setSelectedMonth(e)}>
				<Listbox.Button
					value={selectedDate.month !== today.month ? selectedDate.month : selectedMonth}
					className='relative flex w-auto cursor-pointer items-center gap-5 bg-white py-2 text-15'>
					<span className='block'>
						{/* {selectedDate[0].month !== today.month ? selectedDate[0].month : selectedMonth} */}
						{selectedMonth}
					</span>

					<Image src={ArrowDown} alt='Arrow Down' />
				</Listbox.Button>

				<Transition
					as={Fragment}
					leave='transition ease-in duration-100'
					leaveFrom='opacity-100'
					leaveTo='opacity-0'>
					<Listbox.Options
						className={`absolute h-60 w-36 overflow-y-scroll rounded-md border-1 border-secondary300 bg-white py-1 text-15 shadow-calendar focus:outline-none ${styles.scrollbar_hidden}`}>
						{months.map((array, i) => (
							// rmdp-ym
							<div key={i} className='flex flex-col gap-2.5 text-14'>
								{array.map(({ date, name }, j) => (
									<Listbox.Option
										key={j}
										value={name}
										//   className={getClassName(date)}
										onClick={() => selectMonth(date)}
										onMouseEnter={() => rangeHover && setDateHovered(date)}
										// disabled={notInRange(month)}
										className={({ active }) =>
											` flex cursor-pointer select-none flex-col items-start py-2.5 pr-4 disabled:text-secondary400 ${
												active ? 'text-primary' : 'text-secondary800'
											}`
										}>
										{({ selected }) => (
											<span
												className={`font-medium ${
													selected ? 'text-primary' : ''
												}`}>
												{name}
											</span>
										)}
									</Listbox.Option>
								))}
							</div>
						))}
					</Listbox.Options>
				</Transition>
			</Listbox>
		</div>
	);
};

export default MonthPicker;
