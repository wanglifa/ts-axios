const toString = Object.prototype.toString
export function isDate(val: any): val is Date {
  return toString.call(val) === '[object Date]'
}
export function isPlainObject (val: any): val is Object {
  return toString.call(val) === '[object Object]'
}
export function isObject(val: any): val is Object {
  return val !== null && typeof val === 'object'
}
export function extend<T, U>(to: T, from: U): T & U {
  for (const key in from) {
    (to as T & U)[key] = from[key] as any
  }
  return to as T & U
}
export function deepMerge(...objs: any[]): any {
  // 这里...objs会把你传入的所有的参数都解构到数组里
  // 这里传入两个参数为例 第一个val1: {common:{ Accept: 'application/json, text/plain, */*'}}
  // 第二个val2: {test: 321}
  // 所以...objs就是[{common: {Accept: 'application/json, text/plain'}}, {test: 321}]
  const result = Object.create(null)
  objs.forEach(obj => {
    if (obj) {
      Object.keys(obj).forEach(key => {
        // 这里val假如是{Accept: 'application/json, text/plain'}，key是common
        const val = obj[key]
        // 满足对象条件
        if (isPlainObject(val)) {
          // 如果result里已经有common这个key了，并且它也是一个对象就让新的common等于原有的result[common]和现在的
          // {Accept: 'application/json'}合并
          if (isPlainObject(result[key])) {
            result[key] = deepMerge(result[key], val)
          } else {
            // 否则就直接把{Accept: 'application/json'}单独合并
            result[key] = deepMerge(val)
          }
        } else {
          // 如果不是对象就直接赋值
          result[key] = val
        }
      })
    }
  })
  return result
}