// @flow
import { format } from 'date-fns';

import type { Book } from '../../../../../globals/flowtypes';

const DATE_ONLY_FORMAT = 'MMM. DD, YYYY';
const DATE_AND_TIME_FORMAT = `${DATE_ONLY_FORMAT}, HH:mm:ss`;

export const bookBasicDates = (book: Book) => ([
  {
    title: 'Added',
    value: format(book.created, DATE_AND_TIME_FORMAT),
  },
  {
    title: 'Updated',
    value: format(book.updated, DATE_AND_TIME_FORMAT),
  },
]);

export const bookOptionalDates = (book: Book) => {
  const dates = [];
  if (book.startedOn) {
    dates.push({
      title: 'Started on',
      value: format(book.startedOn, DATE_ONLY_FORMAT),
    });
  }
  if (book.finishedOn) {
    dates.push({
      title: 'Finished on',
      value: format(book.finishedOn, DATE_ONLY_FORMAT),
    });
  }
  return dates;
};

export const hasOptionalDates = (book: Book) =>
  !!book.startedOn || !!book.finishedOn;
