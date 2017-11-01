<template>
  <Scroll class="listview"
          :data="pdata"
          ref="listview"
          :listenScroll="listenScroll"
          @scrollP="scroll"
          :probeType="probeType">
          <ul>
            <li ref='listGroup' v-for='group in pdata' class='list-group'>
              <h2 class='list-group-title'>{{group.title}}</h2>
              <ul>
                <li @click="selectItem(item)" v-for="item in group.items" class="list-group-item">
                  <img class="avatar" v-lazy="item.avatar" alt="">
                  <span class="name">{{item.name}}</span>
                </li>
              </ul>
            </li>
          </ul>
          <div @touchmove.stop.prevent="onShortcutTouchMove" @touchstart="onShortcutTouchStartdiv" class="list-shortcut">
            <ul>
        <li @touchstart="onShortcutTouchStart(index)"
            :data-index="index"
            class="item" 
            :class="{'current' : currentIndex===index}"
            v-for="(item,index) in shortcutList">
          {{item}}
        </li>
      </ul>
          </div>
          <div class="list-fixed" v-show="fixedTitle" ref="fixed">
            <h1 class="fixed-title">{{fixedTitle}}</h1>
          </div>
          <div v-show="!pdata.length" class="loading-container"> 
            <loading></loading> 
          </div> 
  </Scroll>
</template>

<script>
  import Scroll from 'base/scroll'
  import Loading from 'base/loading'

  const ANCHOR_HEIGHT = 18
  const TITLE_HEIGHT = 30
  export default {
    props: {
      pdata: {
        type: Array,
        default: []
      }
    },
    created () {
      // touch存取触点y值
      this.touch = {}
      this.listenScroll = true
      this.listHeight = []
      this.probeType = 3
    },
    data () {
      return {
        scrollY: -1,
        currentIndex: 0,
        diff: -1
      }
    },
    computed: {
      shortcutList () {
        return this.pdata.map((group) => {
          return group.title.substr(0, 1)
        })
      },
      fixedTitle () {
        // console.log(this.pdata)
        if (this.scrollY > 0) {
          return ''
        }
        return this.pdata[this.currentIndex] ? this.pdata[this.currentIndex].title : ''
      }
    },
    methods: {
      _scrollTo (index) {
        if (!index && index !== 0) {
          return
        }
        this.$refs.listview.scrollToElement(this.$refs.listGroup[index], 0)
        this.scrollY = this.$refs.listview.scroll.y
      },
      onShortcutTouchStartdiv (e) {
        // 获取y
        let firstTouch = e.touches[0]
        this.touch.y1 = firstTouch.pageY
      },
      onShortcutTouchMove (e) {
        let firstTouch = e.touches[0]
        this.touch.y2 = firstTouch.pageY
        let data = (this.touch.y2 - this.touch.y1) / ANCHOR_HEIGHT | 0
        this._scrollTo(this.touch.beginIndex + data)
      },
      // 直接滚到目标
      onShortcutTouchStart (index) {
        this._scrollTo(index)
        this.touch.beginIndex = index
      },
      selectItem (item) {
        this.$emit('select', item)
      },
      scroll (pos) {
        this.scrollY = pos.y
      },
      // 数据变动改变滑动长度
      _calculateHeight () {
        this.listHeight = []
        const list = this.$refs.listGroup
        let height = 0
        this.listHeight.push(height)
        for (let i = 0; i < list.length; i++) {
          let item = list[i]
          height += item.clientHeight
          this.listHeight.push(height)
        }
      }
    },
    watch: {
      // 监听歌手列表的滚动
      scrollY (newY) {
        const listHeight = this.listHeight
        // 滚动到顶部 newY>0
        if (newY > 0) {
          this.currentIndex = 0
          return
        }
        // 滚动到中间部分
        for (let i = 0; i < listHeight.length - 1; i++) {
          let height1 = listHeight[i]
          let height2 = listHeight[i + 1]
          if (-newY >= height1 && -newY < height2) {
            this.currentIndex = i
            this.diff = height2 + newY
            return
          }
        }
      // 滚动到底部 -newY 大于最后一个元素的上限
        this.currentIndex = listHeight.length - 2
      },
      pdata () {
        setTimeout(() => {
          this._calculateHeight()
        }, 20)
      },
      diff (newVal) {
        let fixedTop = (newVal > 0 && newVal < TITLE_HEIGHT) ? newVal - TITLE_HEIGHT : 0
        if (this.fixedTop === fixedTop) {
          return
        }
        this.fixedTop = fixedTop
        this.$refs.fixed.style.transform = `translate3d(0,${fixedTop}px,0)`
      }
    },
    components: {
      Scroll,
      Loading
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .listview
    position: relative
    width: 100%
    height: 100%
    overflow: hidden
    background: $color-background
    .list-group
      padding-bottom: 30px
      .list-group-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
      .list-group-item
        display: flex
        align-items: center
        padding: 20px 0 0 30px
        .avatar
          width: 50px
          height: 50px
          border-radius: 50%
        .name
          margin-left: 20px
          color: $color-text-l
          font-size: $font-size-medium
    .list-shortcut
      position: absolute
      z-index: 30
      right: 0
      top: 50%
      transform: translateY(-50%)
      width: 20px
      padding: 20px 0
      border-radius: 10px
      text-align: center
      background: $color-background-d
      font-family: Helvetica
      .item
        padding: 3px
        line-height: 1
        color: $color-text-l
        font-size: $font-size-small
        &.current
          color: $color-theme
    .list-fixed
      position: absolute
      top: 0
      left: 0
      width: 100%
      .fixed-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
    .loading-container
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>
