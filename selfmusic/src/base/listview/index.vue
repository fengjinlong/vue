<template>
  <Scroll class="singer"
          :data="data">
  </Scroll>
</template>

<script>
  import Scroll from 'base/scroll'
  export default {
    props: {
      data: {
        type: Array,
        default: []
      }
    }
    components: {
      Scroll
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  .singer
    position: fixed
    top: 88px
    bottom: 0
    width: 100%
</style>
