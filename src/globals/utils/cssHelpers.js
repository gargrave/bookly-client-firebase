// @flow
function isUseableClass(classname: string): boolean {
  return !!classname.trim();
}

function buildClasses(
  prepends: string | string[],
  statics: string | string[] = []
) {
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

function prependClass(className: string) {
  if (!className) {
    return '';
  }

  if (!className.match(/^bookly-/)) {
    return `bookly-${className}`;
  }
  return className;
}

export {
  buildClasses,
};
