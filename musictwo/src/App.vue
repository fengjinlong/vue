<template>
  <div id="app">
    <Mheader></Mheader>
    <Tab></Tab>
    <keep-alive>
      <router-view></router-view>      
    </keep-alive> 
  </div>
</template>

<script type="text/ecmascript-6">
import Mheader from 'components/m-header'
import Tab from 'components/tab/tab'
export default {
  components: {
    Mheader,
    Tab
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import "~common/stylus/variable"
#app
  color $color-theme
</style>
