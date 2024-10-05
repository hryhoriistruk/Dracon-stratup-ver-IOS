export function cleanError(str: any): string {
  if (!str) {
    return ''
  }
  if (typeof str !== 'string') {
    str = str.toString()
  }
  if (isNetworkError(str)) {
    return 'Unable to connect. Please check your internet connection and try again.'
  }
  if (str.includes('Upstream Failure')) {
    return 'The server appears to be experiencing issues. Please try again in a few moments.'
  }
  if (str.includes('Bad token scope')) {
    return 'This feature is not available while using an App Password. Please sign in with your main password.'
  }
  if (str.startsWith('Error: ')) {
    return str.slice('Error: '.length)
  }
  return str
}

const NETWORK_ERRORS = [
  'Abort',
  'Network request failed',
  'Failed to fetch',
  'Load failed',
]

export function isNetworkError(e: unknown) {
  const str = String(e)
  for (const err of NETWORK_ERRORS) {
    if (str.includes(err)) {
      return true
    }
  }
  return false
}
