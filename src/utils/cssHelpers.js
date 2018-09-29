// @flow
export function buildClass(...classArgs: any): string {
  const classList = []
  classArgs.forEach(classname => {
    // for strings, we can add the immediately
    if (typeof classname === 'string') {
      classList.push(classname)
    }

    // for objects, assume there are multiple values to test,
    // and add each one to the list if its condition passes
    if (typeof classname === 'object') {
      Object.keys(classname).forEach(key => {
        if (classname[key]) {
          classList.push(key)
        }
      })
    }
  })
  return classList.join(' ')
}
