import * as types from './mutation-types'

const mutations = {
  [types.SET_SINGER] (state, singer1) {
    state.singer = singer1
  }
}
export default mutations
