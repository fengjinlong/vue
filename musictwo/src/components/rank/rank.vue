
//   import { mapGetters, mapMutations, mapActions } from 'vuex'
//   import animations from 'create-keyframe-animation'
//   import { prefixStyle } from 'common/js/dom'
//   import ProgressBar from 'base/progress-bar/progress-bar'
//   import ProgressCircle from 'base/progress-circle/progress-circle'
//   import { playMode } from 'common/js/config'
//   import Lyric from 'lyric-parser'
//   import Scroll from 'base/scroll/scroll'
//   import { playerMixin } from 'common/js/mixin'
//   import Playlist from 'components/playlist/playlist'
//   const transform = prefixStyle('transform')
//   const transitionDuration = prefixStyle('transitionDuration')
//   const timeExp = /\[(\d{2}):(\d{2}):(\d{2})]/g
//   export default {
//     mixins: [playerMixin],
//     data() {
//       return {
//         songReady: false,
//         currentTime: 0,
//         radius: 32,
//         currentLyric: null,
//         currentLineNum: 0,
//         currentShow: 'cd',
//         playingLyric: '',
//         isPureMusic: false,
//         pureMusicLyric: ''
//       }
//     },
//     computed: {
//       cdCls() {
//         return this.playing ? 'play' : ''
//       },
//       playIcon() {
//         return this.playing ? 'icon-pause' : 'icon-play'
//       },
//       miniIcon() {
//         return this.playing ? 'icon-pause-mini' : 'icon-play-mini'
//       },
//       disableCls() {
//         return this.songReady ? '' : 'disable'
//       },
//       percent() {
//         return this.currentTime / this.currentSong.duration
//       },
//       ...mapGetters([
//         'currentIndex',
//         'fullScreen',
//         'playing'
//       ])
//     },
//     created() {
//       this.touch = {}
//     },
//     methods: {
//       back() {
//         this.setFullScreen(false)
//       },
//       open() {
//         this.setFullScreen(true)
//       },
//       enter(el, done) {
//         const {x, y, scale} = this._getPosAndScale()
//         let animation = {
//           0: {
//             transform: `translate3d(${x}px,${y}px,0) scale(${scale})`
//           },
//           60: {
//             transform: `translate3d(0,0,0) scale(1.1)`
//           },
//           100: {
//             transform: `translate3d(0,0,0) scale(1)`
//           }
//         }
//         animations.registerAnimation({
//           name: 'move',
//           animation,
//           presets: {
//             duration: 400,
//             easing: 'linear'
//           }
//         })
//         animations.runAnimation(this.$refs.cdWrapper, 'move', done)
//       },
//       afterEnter() {
//         animations.unregisterAnimation('move')
//         this.$refs.cdWrapper.style.animation = ''
//       },
//       leave(el, done) {
//         this.$refs.cdWrapper.style.transition = 'all 0.4s'
//         const {x, y, scale} = this._getPosAndScale()
//         this.$refs.cdWrapper.style[transform] = `translate3d(${x}px,${y}px,0) scale(${scale})`
//         const timer = setTimeout(done, 400)
//         this.$refs.cdWrapper.addEventListener('transitionend', () => {
//           clearTimeout(timer)
//           done()
//         })
//       },
//       afterLeave() {
//         this.$refs.cdWrapper.style.transition = ''
//         this.$refs.cdWrapper.style[transform] = ''
//       },
//       togglePlaying() {
//         if (!this.songReady) {
//           return
//         }
//         this.setPlayingState(!this.playing)
//         if (this.currentLyric) {
//           this.currentLyric.togglePlay()
//         }
//       },
//       end() {
//         this.currentTime = 0
//         if (this.mode === playMode.loop) {
//           this.loop()
//         } else {
//           this.next()
//         }
//       },
//       loop() {
//         this.$refs.audio.currentTime = 0
//         this.$refs.audio.play()
//         this.setPlayingState(true)
//         if (this.currentLyric) {
//           this.currentLyric.seek(0)
//         }
//       },
//       next() {
//         if (!this.songReady) {
//           return
//         }
//         if (this.playlist.length === 1) {
//           this.loop()
//           return
//         } else {
//           let index = this.currentIndex + 1
//           if (index === this.playlist.length) {
//             index = 0
//           }
//           this.setCurrentIndex(index)
//           if (!this.playing) {
//             this.togglePlaying()
//           }
//         }
//       },
//       prev() {
//         if (!this.songReady) {
//           return
//         }
//         if (this.playlist.length === 1) {
//           this.loop()
//           return
//         } else {
//           let index = this.currentIndex - 1
//           if (index === -1) {
//             index = this.playlist.length - 1
//           }
//           this.setCurrentIndex(index)
//           if (!this.playing) {
//             this.togglePlaying()
//           }
//         }
//       },
//       ready() {
//         clearTimeout(this.timer)
//         // 监听 playing 这个事件可以确保慢网速或者快速切换歌曲导致的 DOM Exception
//         this.songReady = true
//         this.canLyricPlay = true
//         this.savePlayHistory(this.currentSong)
//         // 如果歌曲的播放晚于歌词的出现，播放的时候需要同步歌词
//         if (this.currentLyric && !this.isPureMusic) {
//           this.currentLyric.seek(this.currentTime * 1000)
//         }
//       },
//       paused() {
//         this.setPlayingState(false)
//         if (this.currentLyric) {
//           this.currentLyric.stop()
//         }
//       },
//       error() {
//         clearTimeout(this.timer)
//         this.songReady = true
//       },
//       updateTime(e) {
//         this.currentTime = e.target.currentTime
//       },
//       format(interval) {
//         interval = interval | 0
//         const minute = interval / 60 | 0
//         const second = this._pad(interval % 60)
//         return `${minute}:${second}`
//       },
//       onProgressBarChanging (percent) {
//         this.currentTime = this.currentSong.duration * percent
//         if (this.currentLyric) {
//           this.currentLyric.seek(this.currentTime * 1000)
//         }
//       },
//       onProgressBarChange(percent) {
//         const currentTime = this.currentSong.duration * percent
//         this.currentTime = this.$refs.audio.currentTime = currentTime
//         if (this.currentLyric) {
//           this.currentLyric.seek(currentTime * 1000)
//         }
//         if (!this.playing) {
//           this.togglePlaying()
//         }
//       },
//       getLyric() {
//         this.currentSong.getLyric().then((lyric) => {
//           if (this.currentSong.lyric !== lyric) {
//             return
//           }
//           this.currentLyric = new Lyric(lyric, this.handleLyric)
//           this.isPureMusic = !this.currentLyric.lines.length
//           if (this.isPureMusic) {
//             this.pureMusicLyric = this.currentLyric.lrc.replace(timeExp, '').trim()
//             this.playingLyric = this.pureMusicLyric
//           } else {
//             if (this.playing && this.canLyricPlay) {
//               // 这个时候有可能用户已经播放了歌曲，要切到对应位置
//               this.currentLyric.seek(this.currentTime * 1000)
//             }
//           }
//         }).catch(() => {
//           this.currentLyric = null
//           this.playingLyric = ''
//           this.currentLineNum = 0
//         })
//       },
//       handleLyric({lineNum, txt}) {
//         if (!this.$refs.lyricLine) {
//           return
//         }
//         this.currentLineNum = lineNum
//         if (lineNum > 5) {
//           let lineEl = this.$refs.lyricLine[lineNum - 5]
//           this.$refs.lyricList.scrollToElement(lineEl, 1000)
//         } else {
//           this.$refs.lyricList.scrollTo(0, 0, 1000)
//         }
//         this.playingLyric = txt
//       },
//       showPlaylist() {
//         this.$refs.playlist.show()
//       },
//       middleTouchStart(e) {
//         this.touch.initiated = true
//         // 用来判断是否是一次移动
//         this.touch.moved = false
//         const touch = e.touches[0]
//         this.touch.startX = touch.pageX
//         this.touch.startY = touch.pageY
//       },
//       middleTouchMove(e) {
//         if (!this.touch.initiated) {
//           return
//         }
//         const touch = e.touches[0]
//         const deltaX = touch.pageX - this.touch.startX
//         const deltaY = touch.pageY - this.touch.startY
//         if (Math.abs(deltaY) > Math.abs(deltaX)) {
//           return
//         }
//         if (!this.touch.moved) {
//           this.touch.moved = true
//         }
//         const left = this.currentShow === 'cd' ? 0 : -window.innerWidth
//         const offsetWidth = Math.min(0, Math.max(-window.innerWidth, left + deltaX))
//         this.touch.percent = Math.abs(offsetWidth / window.innerWidth)
//         this.$refs.lyricList.$el.style[transform] = `translate3d(${offsetWidth}px,0,0)`
//         this.$refs.lyricList.$el.style[transitionDuration] = 0
//         this.$refs.middleL.style.opacity = 1 - this.touch.percent
//         this.$refs.middleL.style[transitionDuration] = 0
//       },
//       middleTouchEnd() {
//         if (!this.touch.moved) {
//           return
//         }
//         let offsetWidth
//         let opacity
//         if (this.currentShow === 'cd') {
//           if (this.touch.percent > 0.1) {
//             offsetWidth = -window.innerWidth
//             opacity = 0
//             this.currentShow = 'lyric'
//           } else {
//             offsetWidth = 0
//             opacity = 1
//           }
//         } else {
//           if (this.touch.percent < 0.9) {
//             offsetWidth = 0
//             this.currentShow = 'cd'
//             opacity = 1
//           } else {
//             offsetWidth = -window.innerWidth
//             opacity = 0
//           }
//         }
//         const time = 300
//         this.$refs.lyricList.$el.style[transform] = `translate3d(${offsetWidth}px,0,0)`
//         this.$refs.lyricList.$el.style[transitionDuration] = `${time}ms`
//         this.$refs.middleL.style.opacity = opacity
//         this.$refs.middleL.style[transitionDuration] = `${time}ms`
//         this.touch.initiated = false
//       },
//       _pad(num, n = 2) {
//         let len = num.toString().length
//         while (len < n) {
//           num = '0' + num
//           len++
//         }
//         return num
//       },
//       _getPosAndScale() {
//         const targetWidth = 40
//         const paddingLeft = 40
//         const paddingBottom = 30
//         const paddingTop = 80
//         const width = window.innerWidth * 0.8
//         const scale = targetWidth / width
//         const x = -(window.innerWidth / 2 - paddingLeft)
//         const y = window.innerHeight - paddingTop - width / 2 - paddingBottom
//         return {
//           x,
//           y,
//           scale
//         }
//       },
//       /**
//        * 计算内层Image的transform，并同步到外层容器
//        * @param wrapper
//        * @param inner
//        */
//       syncWrapperTransform (wrapper, inner) {
//         if (!this.$refs[wrapper]) {
//           return
//         }
//         let imageWrapper = this.$refs[wrapper]
//         let image = this.$refs[inner]
//         let wTransform = getComputedStyle(imageWrapper)[transform]
//         let iTransform = getComputedStyle(image)[transform]
//         imageWrapper.style[transform] = wTransform === 'none' ? iTransform : iTransform.concat(' ', wTransform)
//       },
//       ...mapMutations({
//         setFullScreen: 'SET_FULL_SCREEN'
//       }),
//       ...mapActions([
//         'savePlayHistory'
//       ])
//     },
//     watch: {
//       currentSong(newSong, oldSong) {
//         if (!newSong.id || !newSong.url || newSong.id === oldSong.id) {
//           return
//         }
//         this.songReady = false
//         this.canLyricPlay = false
//         if (this.currentLyric) {
//           this.currentLyric.stop()
//           // 重置为null
//           this.currentLyric = null
//           this.currentTime = 0
//           this.playingLyric = ''
//           this.currentLineNum = 0
//         }
//         this.$refs.audio.src = newSong.url
//         this.$refs.audio.play()
//         // 若歌曲 5s 未播放，则认为超时，修改状态确保可以切换歌曲。
//         clearTimeout(this.timer)
//         this.timer = setTimeout(() => {
//           this.songReady = true
//         }, 5000)
//         this.getLyric()
//       },
//       playing(newPlaying) {
//         if (!this.songReady) {
//           return
//         }
//         const audio = this.$refs.audio
//         this.$nextTick(() => {
//           newPlaying ? audio.play() : audio.pause()
//         })
//         if (!newPlaying) {
//           if (this.fullScreen) {
//             this.syncWrapperTransform('imageWrapper', 'image')
//           } else {
//             this.syncWrapperTransform('miniWrapper', 'miniImage')
//           }
//         }
//       },
//       fullScreen(newVal) {
//         if (newVal) {
//           setTimeout(() => {
//             this.$refs.lyricList.refresh()
//             this.$refs.progressBar.setProgressOffset(this.percent)
//           }, 20)
//         }
//       }
//     },
//     components: {
//       ProgressBar,
//       ProgressCircle,
//       Scroll,
//       Playlist
//     }
//   }
// </script>

// <style scoped lang="stylus" rel="stylesheet/stylus">
//   @import "~common/stylus/variable"
//   @import "~common/stylus/mixin"
//   .player
//     .normal-player
//       position: fixed
//       left: 0
//       right: 0
//       top: 0
//       bottom: 0
//       z-index: 150
//       background: $color-background
//       .background
//         position: absolute