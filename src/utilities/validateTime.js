const onSameDay = (day1, day2) => ['M', 'Tu', 'W', 'Th', 'F'].some(
  day => day1.includes(day) && day2.includes(day));

const isNotLaterThan = (lhs, rhs) => lhs.padStart(5, '0') <= rhs.padStart(5, '0');

const isIntervalOverlap = (lower1, upper1, lower2, upper2) => isNotLaterThan(lower1, lower2) ? (
                                                                isNotLaterThan(upper1, lower2) ?
                                                                false :
                                                                true
                                                              ):(
                                                                isNotLaterThan(upper2, lower1) ?
                                                                false :
                                                                true
                                                              );

const isConflict = (day1, lower1, upper1, day2, lower2, upper2) =>
 onSameDay(day1, day2) && isIntervalOverlap(lower1, upper1, lower2, upper2);

const parseMeet = str => str.split(/ |-/);

export const isMeetConflict = (meet1, meet2) => 
  isConflict(...parseMeet(meet1), ...parseMeet(meet2));
