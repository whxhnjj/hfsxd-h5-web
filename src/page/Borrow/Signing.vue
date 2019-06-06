<template>
    <div>
      <img class="image" src="../../assets/image/ic_xieyi.png" />
      <div class="ic-xieyi">
        <img class="radio" v-if="!isRadioimg" @click="radioimg" src="../../assets/image/radio-t.png">
        <img class="radio" v-if="isRadioimg" @click="radioimg" src="../../assets/image/radio-f.png">
        <div >本人已阅读并同意<span class="font-size" v-for="item in main" :key="item.index" @click="Signingclick(item)">《{{item.protocolName}}》</span></div>
      </div>
      <div class="button" @click="submit">申请</div>
      <div class="box-pop" v-if="contractModel">
        <div class="close" @click="close">X</div>
        <div v-html="main.contract"></div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'Signing',
  data () {
    return {
      isRadioimg: false,
      contractModel: false,
      main: {
        contract: ''
      }
    }
  },
  created () {
    this.clickContract()
  },
  methods: {
    close () {
      this.contractModel = false
    },
    Signingclick (item) {
      this.main.contract = item.contract
      this.contractModel = true
    },
    clickContract () {
      this.$axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8'
      this.$axios.defaults.headers.post['token'] = localStorage.getItem('token')
      this.$axios.post(this.GLOBAL.axIosUrl + '/api/' + localStorage.getItem('orderNo') + '/signing', {
      })
        .then((res) => {
          res = res.data
          if (res.code === 200) {
            this.main = res.data.contract
            console.log(this.main)
          }
        })
        .catch((res) => {
        })
    },
    submit () {
      this.$axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8'
      this.$axios.defaults.headers.post['token'] = localStorage.getItem('token')
      this.$axios.post(this.GLOBAL.axIosUrl + '/api/' + localStorage.getItem('orderNo') + '/signingEnd')
        .then((res) => {
          res = res.data
          if (res.code === 200) {
            this.$router.push({path: '/Result'})
          }
        })
        .catch((res) => {
        })
    },
    // 选取radio
    radioimg () {
      if (this.isRadioimg === true) {
        this.isRadioimg = false
      } else {
        this.isRadioimg = true
      }
    }
  }
}
</script>

<style scoped>
.image{
  width: 5.48rem;
  height: 4.15rem;
  display: block;
  margin: 2.25rem auto;
}
  .ic-xieyi{
    margin: 0 .4rem;
  }
  .ic-xieyi div{
    margin-left: .4rem;
  }
  .radio{
    width: .32rem;
    height: .32rem;
    float: left;
  }
  .font-size{
    color: #FF8C68;
    line-height: .4rem;
    font-size: .26rem;
  }
  .button{
    height: .88rem;
    width: 80%;
    margin:.4rem 10%;
    background:linear-gradient(310deg,rgba(255,140,104,1) 0%,rgba(253,186,117,1) 100%);
    border-radius: .44rem;
    text-align: center;
    line-height: .88rem;
    color: #FFFFFF;
    font-size: .3rem;
  }
.box-pop{
  width: 100%;
  position: fixed;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 9999;
  background: #FFFFFF;
  font-size: .28rem;
  overflow-y:scroll;
}
.box-pop div{
  padding:.25rem;
}
.box-pop .close{
  width: .5rem;
  height: .5rem;
  font-size: .45rem;
}
</style>
