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
export function processHeaders(headers: Headers, data: any ): void {
  normalizeHeaderName(headers, 'Content-Type')
  if (isPlainObject(data)) {
    if (headers && !headers['Content-Type']) {
      headers['Content-Type'] = 'application/json;charset=utf-8'
    }
  }
}