import storage from 'good-storage'

const SEARCH_KEY = '_search_'
const SEARCH_MAX_LENGTH = 15

function insertArray (arr, val, compare, maxLen) {
  const index = arr.findIndex(compare)
}

export function saveSearch (query) {
  let searches = storage.get(SEARCH_KEY, [])  
}
