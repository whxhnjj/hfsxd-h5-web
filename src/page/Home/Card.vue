<template>
  <div>
    <div class="main">
      <div class="list" v-for="item in main" :key="item.index">
        <img :src="item.bankLogo" />
        <span>{{item.bankName}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Card',
  data () {
    return {
      main: []
    }
  },
  methods: {
    readInfo () {
      this.axios.defaults.headers.get['Content-Type'] = 'application/json'
      this.axios.defaults.headers.get['token'] = this.GLOBAL.Token
      this.axios.get(this.GLOBAL.axIosUrl + 'api/getMoneyResourceBank/' + 'ZF20190527085229' + '/' + '2' + '/v1.0', {
      })
        .then((res) => {
          res = res.data
          if (res.code === 200) {
            this.main = res.data
          }
        })
        .catch((res) => {
        })
    }
  },
  mounted () {
    this.readInfo()
  }
}
</script>

<style scoped>
  .main{
    height: 100%;
    overflow: hidden;
    padding: 0 .4rem;
    background: #FFFFFF;
    margin-top: .16rem;
  }
  .list{
    height: 100%;
    overflow: hidden;
    border-bottom: 0.01rem solid #E7E7E7;
    padding: .26rem 0;
  }
  .list:last-child{
    border-bottom: 0 solid transparent;
  }
  .list img{
    width: .6rem;
    height: .6rem;
    margin-right: .2rem;
    display: block;
    float: left;
  }
  .list span{
    width: 82%;
    display: block;
    float: left;
    height: .6rem;
    color: #333333;
    font-size: .28rem;
    line-height: .6rem;
  }
</style>
