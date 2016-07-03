import _ from 'lodash';

import { parse, format } from './utils/duration';


export const clamp = {
  read: (value, min, max) => _.clamp(parseInt(value, 10) || 0, min, max),
  write: (value, oldValue, min, max) => _.clamp(parseInt(value, 10) || 0, min, max)
};

export const duration = {
  read: format,
  write: parse
};
