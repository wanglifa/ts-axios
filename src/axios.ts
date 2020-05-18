import { AxiosInstance, AxiosRequestConfig, AxiosStatic } from './types'
import Axios from './core/Axios'
import { extend } from './helpers/until'
import defaults from './default'
import mergeConfig from './core/mergeConfig'
import Cancel, { isCancel } from './cancel/cancel'
import CancelToken from './cancel/CancelToken'

function createInstance(config: AxiosRequestConfig): AxiosStatic {
  const context = new Axios(config)
  const instance = Axios.prototype.request.bind(context)
  //
  extend(instance, context)
  return instance as AxiosStatic
}

const axios = createInstance(defaults)
axios.create = (config: any) => {
  return createInstance(mergeConfig(defaults, config))
}
axios.CancelToken = CancelToken
axios.Cancel = Cancel
axios.isCancel = isCancel
console.log(axios, 'axios')

export default axios