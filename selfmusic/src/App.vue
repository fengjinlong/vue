<template>
  <div id="app">
  	<HeaderV></HeaderV>
  	<Tab></Tab>
  	<keep-alive>
  	  <router-view></router-view>
  	</keep-alive>
  </div>
</template>

<script>
import HeaderV from 'components/header'
import Tab from 'components/tab'
export default {
  components: {
    HeaderV,
    Tab
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
