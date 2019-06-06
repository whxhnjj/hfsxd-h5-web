<template>
  <div class="box">
    <div class="img-logo">
      <img class="userInfo" :src="main.userImage" />
      <div class="text-info"><img class="ic-scce" src="../../../assets/image/ic-scce.png" />人脸识别成功</div>
    </div>
    <div class="topPay"></div>
  </div>
</template>

<script>
export default {
  name: 'Page01',
  data () {
    return {
      main: {}
    }
  },
  created () {
    this.getDataInfo()
  },
  methods: {
    getDataInfo () {
      this.$axios.defaults.headers.get['Content-Type'] = 'application/json;charset=utf-8'
      this.$axios.defaults.headers.get['token'] = localStorage.getItem('token')
      this.$axios.get(this.GLOBAL.axIosUrl + '/api/faceIdImgUrlByUserCode')
        .then((res) => {
          res = res.data
          if (res.code === 200) {
            console.log(res)
            this.main = res.data
          }
        })
        .catch((res) => {
        })
    }
  }
}
</script>

<style scoped>
  .box{
    width: 100%;
    height: 100%;
  }
  .img-logo{
    height: 5.2rem;
    width: 4.32rem;
    margin: 2.5rem auto 0;
  }
  .userInfo{
    width: 4.32rem;
    height: 4.32rem;
    border-radius: 50%;
    border: none;
  }
  .text-info{
    margin-top: .5rem;
    width: 100%;
    color: #333333;
    font-size: .3rem;
    height: .42rem;
    line-height: .42rem;
    font-weight:400;
    text-align: center;
  }
  .ic-scce{
    width: .4rem;
    height: .4rem;
    line-height: .4rem;
    margin-right: .19rem;
  }
  .topPay{
    width: .24rem;
    height: .19rem;
    position: absolute;
    bottom: .5rem;
    left: 50%;
    margin-left: -.12rem;
    background: url("../../../assets/image/ic_shanghua.png") no-repeat center center;
    background-size: .24rem .19rem;
  }
</style>
