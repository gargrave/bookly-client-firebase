// @flow
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
