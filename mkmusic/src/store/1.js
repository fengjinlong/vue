export const insertSong = function ({commit, state}, song) { 
  let playlist = state.playlist.slice() 
  let sequenceList = state.sequenceList.slice() 
  let currentIndex = state.currentIndex 
  // 记录当前歌曲 
  let currentSong = playlist[currentIndex] 
  // 查找当前列表中是否有待插入的歌曲并返回其索引 
  let fpIndex = findIndex(playlist, song) 
  // 因为是插入歌曲，所以索引+1 
  currentIndex++ 
  // 插入这首歌到当前索引位置 
  playlist.splice(currentIndex, 0, song) 
  // 如果已经包含了这首歌 
  if (fpIndex > -1) { 
    // 如果当前插入的序号大于列表中的序号 
    if (currentIndex > fpIndex) { 
      playlist.splice(fpIndex, 1) 
      currentIndex-- 
    } else { 
      playlist.splice(fpIndex + 1, 1) 
    } 
  } 

  let currentSIndex = findIndex(sequenceList, currentSong) + 1 

  let fsIndex = findIndex(sequenceList, song) 

  sequenceList.splice(currentSIndex, 0, song) 

  if (fsIndex > -1) { 
    if (currentSIndex > fsIndex) { 
      sequenceList.splice(fsIndex, 1) 
    } else { 
      sequenceList.splice(fsIndex + 1, 1) 
    } 
} 
