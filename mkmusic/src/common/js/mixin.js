import {mapGetters} from 'vuex'

export const playlistMixin = {
  computed: {
    ...mapGetters([
      'playlist'
    ])
  },
  mounted () {
    this.handlePlaylist(this.playlist)
  },
  activated () {
    this.handlePlaylist(this.playlist)
  },
  methods: {
    // 如果组件没有定义handlePlaylist方法，就会执行mixin的hanglePlaylist方法
    handlePlaylist () {
      throw new Error('component must implement handlePlaylist method')
    }
  },
  watch: {
    playlist (newVal) {
      this.handlePlaylist(newVal)
    }
  }
}
