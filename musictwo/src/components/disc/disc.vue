<template>
  <transition name="slide">
    <MusicList :title="title" :bgImage="bgImage" :songs="songs"></MusicList>
  </transition>
</template>
<script type="text/ecmascript-6">
  import MusicList from 'components/music-list/music-list'
  import {mapGetters} from 'vuex'
  import {getSongList} from 'api/recommend'
  import {ERR_OK} from 'api/config'
  import {createSong} from 'common/js/song'
  export default {
    data () {
      return {
        songs: []
      }
    },
    computed: {
      title () {
        return this.disc.dissname
      },
      bgImage () {
        return this.disc.imgurl
      },
      ...mapGetters([
        'disc'
      ])
    },
    created () {
      this._getSongList()
    },
    methods: {
      _getSongList () {
        getSongList(this.disc.dissid).then((res) => {
          console.log(res.code)
          if (res.code === ERR_OK) {
            console.log(5555)
            this.songs = this._normalizeSongs(res.cdlist[0].songlist)
            // console.log(this.songs.length)
          }
        })
      },
      _normalizeSongs (list) {
        console.log(666)
        let ret = []
        list.forEach((musicDate) => {
          if (musicDate.songid && musicDate.albumid) {
            // console.log(musicDate)
            ret.push(createSong(musicDate))
          }
        })
        return ret
      }
    },
    components: {
      MusicList
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  .slide-enter-active, .slide-leave-active
    transition all 0.3s
  .slide-enter, .slide-leave-to
    transform translate3d(100%, 0, 0)
</style>