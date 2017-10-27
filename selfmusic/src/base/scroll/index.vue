<template>
  <div ref="wrapper">
  	<slot></slot>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'

  const DIRECTION_H = 'horizontal'
  const DIRECTION_V = 'vertical'

  export default {
    props: {
      probeType: {
        type: Number,
        default: 1
      },
      click: {
        type: Boolean,
        default: false
      },
      data: {
        type: Array,
        default: null
      },
      refreshDelay: {
        type: Number,
        default: 20
      },
      direction: {
        type: String,
        default: DIRECTION_V
      },
      listenScroll: {
        type: Boolean,
        default: false
      }
    },
    mounted: {
      this._initScroll()
    },
    methods: {
      _initScroll () {
        if (!this.$refs.wrapper) {
          return
        }
        this.scroll = new BScroll(this.$refs.wrapper, {
          probeType: this.probeType,
          click: this.click,
          // 忽略某一方向的滚动
          eventPassthrough: this.direction === DIRECTION_V ? DIRECTION_H : DIRECTION_V
        })
        if (this.listenScroll) {
          let _this = this
          this.scroll.on('scroll', (pos) => {
            // 派发scrollP    切记切记切记切记
            _this.$emit('scrollP', pos)
          })
        }
      },
      disable () {
        this.scroll && this.scroll.disable()
      },
      enable () {
        this.scroll && this.scroll.enable()
      },
      refresh () {
        this.scroll && this.scroll.refresh()
      },
      scrollTo () {
        this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
      },
      scrollToElement () {
        this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
      }
    },
    watch: {
      data () {
        setTimeout(() => {
          this.refresh()
        }, this.refreshDelay)
      }
    }

  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
</style>
