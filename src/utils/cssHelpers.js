// @flow
const CLASS_NAME = 'bookly';

const isUseableClass = (classname: string): boolean => !!classname.trim();

function prependClass(className: string): string {
  if (!className) {
    return '';
  }

  if (!className.match(/^bookly-/)) {
    return `${CLASS_NAME}-${className}`;
  }
  return className;
}

export function buildClasses(
  prepends: string | string[],
  statics: string | string[] = []
): string {
  if (!Array.isArray(prepends)) {
    prepends = [prepends];
  }
  if (!Array.isArray(statics)) {
    statics = [statics];
  }

  const first = prepends
    .filter(isUseableClass)
    .map(prependClass)
    .join(' ');

  const second = statics.length
    ? ` ${statics.filter(isUseableClass).join(' ')}`
    : '';

  return `${first}${second}`;
}
