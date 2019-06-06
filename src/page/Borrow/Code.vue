<template>
    <div>
      <div class="code-val">
        <span>提现验证码</span>
        <van-password-input :value="value" :mask="false" @focus="showKeyboard = true" />
        <div class="code-time" v-show="sendAuthCode"  @click="getAuthCode">重新发送</div>
        <div class="code-time" v-show="!sendAuthCode">重新发送<i class="code-time-text">({{code_num}}s)</i></div>
      </div>
      <!-- 数字键盘 -->
      <van-number-keyboard :show="showKeyboard" @input="onInput" @delete="onDelete" @blur="showKeyboard = false"/>
    </div>
</template>

<script>
export default {
  name: 'Code',
  data () {
    return {
      value: '',
      sendAuthCode: true,
      code_num: 0,
      showKeyboard: true
    }
  },
  created () {
    this.getAuthCode()
  },
  methods: {
    CodeNumInfo () {
      this.$axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8'
      this.$axios.defaults.headers.post['spreadType'] = 'MYG'
      this.$axios.post(this.GLOBAL.axIosUrl + '/api/' + this.$route.query.phone + '/sendSingleMessage')
        .then((res) => {
          res = res.data
          console.log(res)
          if (res.code === 200) {
            this.$toast('发送成功!')
          }
        })
        .catch((res) => {
        })
    },
    onInput (key) {
      this.value = (this.value + key).slice(0, 6)
      if (this.value.length === 6) {
        this.$router.push({path: '/Signing'})
        this.$axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8'
        this.$axios.defaults.headers.post['spreadType'] = 'MYG'
        this.$axios.post(this.GLOBAL.axIosUrl + '/api/borrowsing/auth', {
          mobile: this.$route.query.phone,
          orderNo: this.$route.query.orderNo,
          smsCode: this.value
        })
          .then((res) => {
            res = res.data
            console.log(res)
            if (res.code === 200) {
              this.$toast('提交成功!')
              this.$router.push({path: '/Signing'})
            } else {
              this.$toast('验证码错误!')
            }
          })
          .catch((res) => {
          })
      }
    },
    onDelete () {
      this.value = this.value.slice(0, this.value.length - 1)
    },
    // 短信倒计时
    getAuthCode: function () {
      this.CodeNumInfo()
      this.sendAuthCode = false
      this.code_num = 60
      let timefun = setInterval(() => {
        this.code_num--
        if (this.code_num <= 0) {
          this.sendAuthCode = true
          clearInterval(timefun)
        }
      }, 1000)
    }
  }
}
</script>

<style scoped>
.code-val{
  margin-top: 2.15rem;
}
  .code-val span{
    text-align: center;
    color: #333333;
    display: block;
    font-size: .36rem;
    font-weight:400;
    line-height: .5rem;
    margin-bottom: .5rem;
  }
.code-time{
  text-align: right;
  font-size: .28rem;
  color: #333333;
  line-height: .4rem;
  padding: 0 .3rem;
  float: right;
  margin-top: .25rem;
  width: 100%;
  font-weight:400;
}
.code-time-text{
  font-style: normal;
  color: #FF6332;
}
</style>
