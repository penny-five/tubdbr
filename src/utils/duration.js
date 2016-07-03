import moment from 'moment';


export function format(value) {
  return moment.duration(value, 'seconds').format('mm:ss', { trim: false });
}

export function parse(value) {
  const minutes = parseInt(value.split(':')[0], 10) || 0;
  const seconds = parseInt(value.split(':')[1], 10) || 0;
  return minutes * 60 + seconds;
}
