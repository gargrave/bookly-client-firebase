// @flow
const CLASS_NAME = 'bookly';// TODO: delete this nephew......

const isUseableClass = (classname: string): boolean => !!classname.trim();
// TODO: delete this nephew......
function prependClass(className: string): string {
  if (!className) {
    return '';
  }

  if (!className.match(/^bookly-/)) {
    return `${CLASS_NAME}-${className}`;
  }
  return className;
}
// TODO: delete this nephew......
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

export function buildClass(...classArgs: any): string {
  const classList = [];
  classArgs.forEach((c) => {
    // for strings, we can add the immediately
    if (typeof c === 'string') {
      classList.push(c);
    }

    // for objects, assume there are multiple values to test,
    // and add each one to the list if its condition passes
    if (typeof c === 'object') {
      Object.keys(c).forEach((key) => {
        if (c[key]) {
          classList.push(key);
        }
      });
    }
  });
  return classList.join(' ');
}
