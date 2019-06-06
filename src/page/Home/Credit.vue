<template>
  <div>
    <div class="formInfo-Content">
      <van-field type="text" label="申请人"   readonly input-align="right"  v-model="userInfo.userName"></van-field>
      <van-field type="text" label="身份证号" readonly input-align="right"  v-model="userInfo.identityCardNumber"></van-field>
      <van-field type="text" label="申请金额" readonly input-align="right"  v-model="money"></van-field>
      <div class="card">
        <div class="xuanzecard" v-if="reservedPhone === ''" @click="routerToBack"><img class="xuanzecardimg" src="../../assets/image/card-xz.png" /><span>请选择收款账户</span></div>
        <div v-else @click="routerToBack">
          <img :src="isbanklogo" />
          <div class="card-info">
            <div class="account"><span>收款账户</span><i>({{isbankName}}{{isbanknum}})</i></div>
            <div class="tip-card">日交易限额{{bankDailyLimit}}万 2小时内到账</div>
            <div class="tip-card">预留手机号{{reservedPhone}}</div>
          </div>
        </div>
        <div class="foot" @click="SupportCard">
          <span>支持银行卡</span><i>i</i>
        </div>
      </div>
    </div>
    <div class="contract">
      <div class="contract-radio">
        <van-checkbox class="radio" checked-color="#F78C62" v-model="checked">本人已仔细阅读并完全理解同意</van-checkbox>
        <i @click="clickcontractPop">《相关合同》</i>
      </div>
      <div class="Tips">温馨提示：您当前正在授信环节，该环节您可能会进行多次操作请耐心等待，以提高您的申请成功率。</div>
    </div>
    <div class="submit" @click="SubmitClick">确认授信</div>
    <van-popup class="contractPop" v-model="contractPop">
      <ul>
        <li v-for="item in main" :key="item.index" @click="clickContract(item)">{{item.protocolName}}</li>
      </ul>
    </van-popup>
    <div  class="box-pop" v-if="contractModel">
      <div class="close" @click="close">X</div>
      <div v-html="contactPreviewurl"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Credit',
  data () {
    return {
      checked: true,
      contractPop: false,
      contractModel: false,
      contactPreviewurl: '',
      main: [],
      userInfo: {
        userName: '***',
        identityCardNumber: '***********'
      },
      money: '10000.00',
      isbanklogo: '', // 银行卡logo
      isbankid: '',
      isbankName: '',
      isbanknum: '',
      reservedPhone: '',
      bankDailyLimit: ''
    }
  },
  created () {
    this.getDataUserInfo()
    this.getDataInfo()
  },
  mounted () {
    window.getAccountDetail = this.getAccountDetail
  },
  methods: {
    getAccountDetail (data) {
      if (data) {
        let res = JSON.parse(data)
        this.isbanklogo = res.logo // logo
        this.isbankid = res.id // 银行卡id
        this.isbankName = res.bankName // 银行卡行名字
        this.isbanknum = (res.bankCardImgUrlFull).substr(-4) // 截取银行卡号后4位
        this.reservedPhone = res.bankPhone // 预留手机号
        this.bankDailyLimit = res.dayLimit // 日交易限额
        // this.bankCardImgUrl = res.bankCardImgUrl  // 银行卡照片
      }
    },
    // 更换收款银行卡
    routerToBack () {
      let obj = {
        'bankId': this.isbankid,
        'platform': 'ZF20190527085229',
        'product': '20'
      }
      let data = JSON.stringify(obj)
      if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
        window.webkit.messageHandlers.callAccountIosInfo.postMessage(data)
      } else if (/(Android|Linux)/i.test(navigator.userAgent)) {
        window.messageHandlers.callAccountAndInfo(data)
      } else {
        this.$toast('无法识别手机型号')
      };
    },
    // 获取用户信息
    getDataUserInfo () {
      this.$axios.defaults.headers.get['Content-Type'] = 'application/json;charset=utf-8'
      this.$axios.defaults.headers.get['token'] = localStorage.getItem('token')
      this.$axios.get(this.GLOBAL.axIosUrl + '/api/assess/userinfo')
        .then((res) => {
          res = res.data
          this.userInfo = res.data
        })
        .catch((res) => {
        })
    },
    SubmitClick () {
      if (this.checked === false) {
        this.$toast('请勾选合同协议')
        return
      }
      this.$axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8'
      this.$axios.defaults.headers.post['token'] = localStorage.getItem('token')
      this.$axios.post(this.GLOBAL.axIosUrl + '/api/userSync', {
        bankCardId: this.isbankid,
        evaluateNum: localStorage.getItem('businessNo'),
        fundsCode: 'ZF20190527085229',
        userNumber: ''
      })
        .then((res) => {
          res = res.data
          if (res.code === 200) {
          }
        })
        .catch((res) => {
        })
    },
    clickcontractPop () {
      this.contractPop = true
    },
    close () {
      this.contractModel = false
    },
    clickContract (data) {
      this.$axios.defaults.headers.get['Content-Type'] = 'application/json;charset=utf-8'
      this.$axios.defaults.headers.get['token'] = localStorage.getItem('token')
      this.$axios.get(this.GLOBAL.axIosUrl + '/api/getContractType/' + data.protocolCode + '/' + '123523' + '/v1.0', {
      })
        .then((res) => {
          res = res.data
          if (res.code === 200) {
            this.contactPreviewurl = res.data.contactPreviewurl
            console.log(this.contactPreviewurl)
            this.contractPop = false
            this.contractModel = true
          }
        })
        .catch((res) => {
        })
    },
    getDataInfo () {
      this.$axios.defaults.headers.get['Content-Type'] = 'application/json;charset=utf-8'
      this.$axios.defaults.headers.get['token'] = localStorage.getItem('token')
      this.$axios.get(this.GLOBAL.axIosUrl + '/api/getcreditGranting/ZF20190426030712/v1.0', {
      })
        .then((res) => {
          res = res.data
          this.main = res.data.contract
          console.log(this.main)
        })
        .catch((res) => {
        })
    },
    //  支持银行卡
    SupportCard () {
      this.$router.push({path: '/Card'})
    }
  }
}
</script>

<style scoped>
  .formInfo-Content{
    padding: 0 .2rem;
    overflow: hidden;
    background: #FFFFFF;
  }
  .xuanzecard{
    height: 1rem;
    line-height: 1rem;
  }
  .xuanzecard span{
    float: left;
    height: 1rem;
    line-height: 1rem;
    margin-left: .2rem;
  }
  .xuanzecard .xuanzecardimg{
    margin: .29rem 0;
    width: .42rem;
    height: .42rem;
    display: block;
    float: left;
  }
  .card{
    margin-left: 15px;
    border-bottom: 1px solid #EEEEEE;
    background: url("../../assets/image/go-arrow.png") no-repeat right center;
    background-size: .15rem .27rem;
  }
  .card img{
    width: .84rem;
    height: .84rem;
    margin: .4rem .3rem;
    float: left;
  }
  .card-info{
    margin-top: .2rem;
    float: left;
  }
  .account{
    width: 100%;
    float: left;
    line-height: .48rem;
  }
  .account span{
    color: #333333;
    font-size: .34rem;
    float: left;
    font-weight:400;
  }
  .account i{
    color: #333333;
    float: left;
    font-weight:400;
    font-size: .24rem;
  }
  .tip-card{
    font-size: .22rem;
    color: #999999;
    font-weight:400;
    line-height: .3rem;
  }
  .foot{
    width: 100%;
    float: right;
    height: .74rem;
  }
  .foot span{
    float: right;
    line-height: .74rem;
    font-weight:400;
    color: #F78C62;
    font-size: .24rem;
    height: .74rem;
    display: block;
    margin-left: .1rem;
  }
  .foot i{
    float: right;
    width: .29rem;
    height: .29rem;
    display: block;
    background: #F78C62;
    color: #FFFFFF;
    border-radius: 50%;
    font-size: .28rem;
    line-height: .29rem;
    text-align: center;
    margin: .22rem 0;
  }
  .contract{
    margin: .4rem .4rem .8rem .4rem;
  }
  .contract-radio{
    color: #333333;
    font-size: .26rem;
    height: .5rem;
    font-weight:400;
  }
  .contract-radio .radio{
    float: left;
  }
  .contract-radio i{
    float: left;
    color: #F78C62;
    line-height: .35rem;
  }
  .Tips{
    font-size: .24rem;
    font-weight: 400;
    line-height: .44rem;
    color: #666666;
  }
  .submit{
    width: 6.7rem;
    height: .88rem;
    background:linear-gradient(310deg,rgba(255,140,104,1) 0%,rgba(253,186,117,1) 100%);
    border-radius:44px;
    color: #FFFFFF;
    font-size: .3rem;
    line-height: .88rem;
    text-align: center;
    position: absolute;
    left: 50%;
    margin-left: -3.35rem;
    margin-top: .4rem;
  }
  .contractPop ul{
    padding: .3rem;
    background: #FFFFFF;
  }
  .contractPop ul li{
    border-bottom: 1px solid #eeeeee;
    background: #FFFFFF;
    padding: .15rem 0;
    font-size: .28rem;
    line-height: .4rem;
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
