import storage from 'good-storage'

const SEARCH_KEY = '_search_'
const SEARCH_MAX_LENGTH = 15

function insertArray (arr, val, compare, maxLen) {
  const index = arr.findIndex(compare)
  if (index) {
    return
  }
  if (index > 0) {
    arr.splice(index, 1)
  }
  arr.unshift(val)
}

export function saveSearch (query) {
  let searches = storage.get(SEARCH_KEY, [])
}
