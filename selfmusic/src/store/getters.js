export const singer = state => state.singer

export const playing = state => state.playing

export const funnScreen = state => state.funnScreen

export const playList = state => state.playList

export const sequenceList = state => state.sequenceList

export const mode = state => state.mode

export const currentIndex = state => state.currentIndex
// 是否可以这样写

export const currentSong = state => state.playList[state.currentIndex]
