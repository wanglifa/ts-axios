import { AxiosInstance } from './types'
import Axios from './core/Axios'
import { extend } from './helpers/until'

function createInstance(): any {
  const context = new Axios()
  for (const key in context) {
    console.log(key, 'kkk')
  }
  const instance = Axios.prototype.request.bind(context)
  //
  extend(instance, context)
  console.log(instance, 'hhh')
  console.log(context, 'con')
  return instance
}

const axios = createInstance()
console.log(axios, 'axios')

export default axios