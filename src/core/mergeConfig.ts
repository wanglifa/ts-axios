import { AxiosRequestConfig } from '../types'
import { deepMerge, isPlainObject } from '../helpers/until'
interface NewMergeObj {
  [key: string]: any;
}
function defaultStrat(val1: any, val2: any) {
  return typeof val2 !== 'undefined' ? val2 : val1
}
function fromVal2Strat(val1: any, val2: any) {
  if (typeof val2 !== 'undefined') {
    return val2
  }
}
function deepMergestrat(val1: any, val2: any): any {
  console.log(val1, 'val1')
  console.log(val2, 'val2')
  if (isPlainObject(val2)) {
    console.log(1)
    return deepMerge(val1, val2)
  } else if (typeof val2 !== 'undefined') {
    return val2
  } else if (isPlainObject(val1)) {
    return deepMerge(val1)
  } else if (typeof val1 !== 'undefined') {
    return val1
  }
}

const strats: NewMergeObj = {}
// 如果是url params data这些key就用第二个参数的值
const stratKeysFromVal2 = ['url', 'params', 'data']
stratKeysFromVal2.forEach(key => {
  strats[key] = fromVal2Strat
})
const startKeysDeepMerge = ['headers']
startKeysDeepMerge.forEach(key => {
  strats[key] = deepMergestrat
})
export default function mergeConfig(
  config1: AxiosRequestConfig,
  config2?: AxiosRequestConfig
) {
  if (!config2) {
    config2 = {}
  }
  const config: NewMergeObj = {}
  for (let i in config1) {
    mergeField(i)
  }
  for (let i in config2) {
    if(!config2[i]) {
      mergeField(i)
    }
  }
  function mergeField(key: string) {
    const strat = strats[key] || defaultStrat
    config[key] = strat(config1[key], config2![key])
  }

  return config
}