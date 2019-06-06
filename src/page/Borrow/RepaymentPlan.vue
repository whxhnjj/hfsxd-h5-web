<template>
  <div>
    <div class="tip">试算结果仅供参考，具体以您签署的借款文件</div>
    <div class="header">
      <div class="title">待还总额(元)</div>
      <div class="num">{{amount}}</div>
    </div>
    <div class="main">
      <div class="box" v-for="item in arrData" :key="item.index">
        <div class="periods"><span>{{item.payTime}}</span>/{{arrData.length}}期</div>
        <div class="date">还款日{{item.installmentInterestStartDate | formatDate}}</div>
        <div class="money">{{item.totalAmount}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import {formatDate} from '../../assets/js/data.js'
export default {
  name: 'RepaymentPlan',
  data () {
    return {
      amountCount: '',
      arrData: []
    }
  },
  methods: {
    readInfo () {
      console.log(localStorage.getItem('fish'))
      this.$axios.defaults.headers.post['Content-Type'] = 'application/json'
      this.$axios.defaults.headers.post['token'] = localStorage.getItem('token')
      this.$axios.post(this.GLOBAL.axIosUrl + 'api/repaymentPlan', {
        amount: this.$route.query.Num,
        consumptionTypeProductResponseDTO: JSON.parse(localStorage.getItem('fish'))
      })
        .then((res) => {
          res = res.data
          this.amount = res.data.amount
          this.arrData = res.data.orderRepaymentPlanResponseList
        })
        .catch((res) => {
          this.$toast('网络错误')
        })
    }
  },
  filters: {
    formatDate (time) {
      var date = new Date(time)
      return formatDate(date, 'yyyy-MM-dd')
    }
  },
  mounted () {
    this.readInfo()
  }
}
</script>

<style scoped>
  .tip{
    height: .64rem;
    background:rgba(244,244,244,1);
    text-align: center;
    line-height: .64rem;
    font-size: .24rem;
    color: #999999;
  }
  .header{
    padding: .4rem 0 .3rem 0;
    background: #FFFFFF;
    text-align: center;
  }
  .title{
    color: #999999;
    height: .4rem;
    font-size: .28rem;
    line-height: .4rem;
  }
  .num{
    color: #FF6332;
    font-size: .64rem;
    font-weight:500;
    height: .9rem;
    line-height: .9rem;
  }
  .main{
    margin-top: .16rem;
    padding: 0 .35rem;
    height: 100%;
    overflow: hidden;
    background: #FFFFFF;
  }
  .box{
    padding: .26rem 0 .32rem 0;
    height:100%;
    overflow: hidden;
    border-bottom:0.01rem solid #f4f4f4;
  }
  .periods{
    float: left;
    font-size: .28rem;
    color: #999999;
    height: .5rem;
    line-height: .5rem;
  }
  .periods span{
    font-size: .36rem;
    color: #666666;
  }
  .date{
    float: right;
    height: .5rem;
    line-height: .5rem;
    color: #666666;
  }
  .money{
    width: 100%;
    float: left;
    line-height: .45rem;
    height: .45rem;
    color: #333333;
    font-size: .32rem;
    font-weight: bold;
  }
</style>
