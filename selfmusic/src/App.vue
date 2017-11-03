<template>
  <div id="app">
  	<HeaderV></HeaderV>
  	<Tab></Tab>
  	<keep-alive>
  	  <router-view></router-view>
  	</keep-alive>
    <Player></Player>
  </div>
</template>

<script>
import HeaderV from 'components/header'
import Tab from 'components/tab'
import Player from 'components/player'
export default {
  components: {
    HeaderV,
    Tab,
    Player
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
