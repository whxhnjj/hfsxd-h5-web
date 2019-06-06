<template>
  <div id="app">
    <router-view  v-wechat-title="$route.meta.title"></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  created () {
    let tempStr = window.location.href
    var index = tempStr.lastIndexOf('=')
    tempStr = tempStr.substring(index + 1, tempStr.length)
    localStorage.setItem('token', tempStr)
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.van-field__control::-webkit-input-placeholder {
  line-height: 1rem;
  text-align: right;
}
.van-field__control:-moz-placeholder {
  line-height: 1rem;
  text-align: right;
}
.van-field__control:-ms-input-placeholder {
  line-height: 1rem;
  text-align: right;
}
</style>
