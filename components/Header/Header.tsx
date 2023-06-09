import Arrow from '../Arrow/Arrow';
import YearPicker from '../YearPicker/YearPicker';
import MonthPicker from '../MonthPicker/MonthPicker';

// interface
import { HeaderProps } from './HeaderInterface';

enum ArrowDirection {
	Right = -1,
	Left = 1,
}

const Header: React.FC<HeaderProps> = ({
	state,
	setState,
	handleMonthChange,
	disabled,
	onChange,
	monthAndYears: [months, years],
}) => {
	let { date, minDate, maxDate, year, today } = state,
		isPreviousDisable =
			minDate && date.year <= minDate.year && minDate.monthIndex > date.monthIndex - 1,
		isNextDisable =
			maxDate && date.year >= maxDate.year && maxDate.monthIndex < date.monthIndex + 1;

	let maxYear = today.year + 7;

	maxYear = maxYear - 12 * Math.floor((maxYear - year) / 12);

	// if (mustShowYearPicker) {
	// 	let minYear = maxYear - 11;

	// 	isPreviousDisable = minDate && minDate.year > minYear;
	// 	isNextDisable = maxDate && maxDate.year < maxYear;
	// }

	// if (disabled) {
	// 	isPreviousDisable = true;
	// 	isNextDisable = true;
	// }

	return (
		// rmdp-header
		<div className='flex h-10 w-full items-center justify-between text-14 font-bold'>
			{months.map((month: string, index: number) => (
				<div
					key={month}
					// rmdp-header-values
					className='flex w-full items-center justify-between'>
					{getButton('left')}
					{/* <span className={`flex w-32 cursor-pointer items-center justify-between`}>
							{month}
						</span> */}
					<MonthPicker
						state={state}
						onChange={onChange}
						handleMonthChange={handleMonthChange}
					/>
					<YearPicker state={state} onChange={onChange} />
					{getButton('right')}
				</div>
			))}
		</div>
	);

	function getButton(direction: string) {
		let handleClick = () =>
				increaseValue(direction === 'right' ? ArrowDirection.Right : ArrowDirection.Left),
			disabled =
				(direction === 'left' && isPreviousDisable) ||
				(direction === 'right' && isNextDisable);

		return <Arrow direction={direction} onClick={handleClick} disabled={disabled} />;
	}

	function increaseValue(value:number) {
		if (disabled || (value < 0 && isPreviousDisable) || (value > 0 && isNextDisable)) return;

		if (!mustShowYearPicker) {
			date.toFirstOfMonth();

			date.month += value;

			handleMonthChange(date);
		} else {
			year = year + value * 12;

			if (value < 0 && minDate && year < minDate.year) year = minDate.year;
			if (value > 0 && maxDate && year > maxDate.year) year = maxDate.year;
		}

		setState({
			...state,
			date,
			year,
		});
	}
};

export default Header;
