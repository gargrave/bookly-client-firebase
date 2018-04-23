export const toUnixTimestamp = (date, defaultValue) => {
  if (!date) {
    if (defaultValue === null || defaultValue === undefined) {
      return Date.now();
    }
    return defaultValue;
  }

  if (date._isAMomentObject) {
    return date.unix();
  }

  if (typeof date === 'number') {
    return date;
  }

  return defaultValue;
};

export const toUnixMs = (date) =>
  (date && date * 1000) || 0;
