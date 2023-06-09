import isSameDate from './isSameDate';

const getRangeClass = (
	date: any,
	selectedDate: any,
	checkMonth?: any,
	oneDaySelectStyle?: string,
	rangeDateStyle?: string,
	startRangeDayStyle?: string,
	endRangeDayStyle?: string
) => {
	let first = selectedDate[0],
		second = selectedDate[1],
		names = [];

	if (selectedDate.length === 1) {
		// if (isSameDate(date, first, checkMonth)) names.push('rmdp-range text-black bg-primary text-white rounded-md');
		// if (isSameDate(date, first, checkMonth))
		if (isSameDate(date, first)) {
			names.push('bg-primary text-white rounded-xl');
			// names.push(oneDaySelectStyle);
		}
	} else if (selectedDate.length === 2) {
		if (date.toDays() >= first.toDays() && date.toDays() <= second.toDays()) {
			names.push('bg-sky-200'); // rmdp-range
		}

		// if (isSameDate(date, first, checkMonth, startRangeDayStyle))
		// if (isSameDate(date, first, checkMonth))
		if (isSameDate(date, first)) {
			// names.push('start');
			names.push('bg-primary text-white rounded-r-xl');
		}

		// if (isSameDate(date, second, checkMonth))
		if (isSameDate(date, second)) {
			// names.push('end');
			names.push('bg-primary text-white rounded-l-xl');
		}
	}

	return names.join(' ');
};

export default getRangeClass;
