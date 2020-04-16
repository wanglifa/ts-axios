import { isPlainObject } from './until'

interface Headers {
  [k: string]: string
}
function normalizeHeaderName(headers: Headers, normalizeName: string): void {
  if (!headers) {
    return
  }
  Object.keys(headers).map((name) => {
    if (name !== normalizeName && name.toUpperCase() === normalizeName.toUpperCase()) {
      headers[normalizeName] = headers[name]
      delete headers[name]
    }
  })
}
export function processHeaders(headers: Headers, data: any ): Headers {
  normalizeHeaderName(headers, 'Content-Type')
  if (isPlainObject(data)) {
    if (headers && !headers['Content-Type']) {
      headers['Content-Type'] = 'application/json;charset=utf-8'
    }
  }
  return headers
}
export function parseHeaders(headers: string): Headers {
  const newObj: Headers = {}
  if (headers) {
    headers.split('\r\n').forEach((line) => {
      let [key, value] = line.split(':')
      key = key.trim().toLowerCase()
      if (!key) {
        return
      }
      value = value.trim().toLowerCase()
      if (!value) {
        return
      }
      newObj[key] = value
    })
  }
  return newObj
}