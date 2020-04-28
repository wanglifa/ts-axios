import { AxiosInstance, AxiosRequestConfig, AxiosStatic } from './types'
import Axios from './core/Axios'
import { extend } from './helpers/until'
import defaults from './default'
import mergeConfig from './core/mergeConfig'

function createInstance(config: AxiosRequestConfig): AxiosStatic {
  const context = new Axios(config)
  const instance = Axios.prototype.request.bind(context)
  //
  extend(instance, context)
  return instance as AxiosStatic
}

const axios = createInstance(defaults)
axios.create = (config) => {
  return createInstance(mergeConfig(defaults, config))
}
console.log(axios, 'axios')

export default axios