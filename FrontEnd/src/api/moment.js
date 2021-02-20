import 'moment/locale/ko';
import moment from 'moment';

// 2020년 2월 6일
const momentDate = (date = new Date()) => moment(date).format('LL');
// 오후 2:32
const momentTime = (date = new Date()) => moment(date).format('LT');
// 2020년 2월 6일 오후 2:33
const momentDateTime = (date = new Date()) => moment(date).format('LLL');

// 2020년 2월 6일 월요일
const momentDateDay = (date = new Date()) =>
  momentDate(date) + ' ' + moment(date).format('dddd');

// 2월 6일 월요일
const momentDateDayWithoutYear = (date = new Date()) =>
  moment(date).format('MMMM Do dddd');

// 2020-02-06
const convertDate = (date = new Date()) => moment(date).format('YYYY-MM-DD');
// 2020-02-06 12:00:00
const convertDate12 = (date = new Date()) =>
  moment(date).format('YYYY-MM-DD 12:00:00');

export default {
  momentDate,
  momentTime,
  momentDateTime,
  momentDateDay,
  momentDateDayWithoutYear,
  convertDate,
  convertDate12,
};
