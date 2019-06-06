<template>
  <div class="box">
    <div class="tip-top"></div>
    <div class="formInfo-Content">
      <van-field placeholder="请选择从通讯录选择" label="姓名" :readonly="readonlyLoad" value-key="value" input-align="right" v-model="userInfo.Name01" right-icon="arrow"></van-field>
      <van-field type="text" label="联系方式" placeholder="请输入" :readonly="readonlyLoad" input-align="right"  v-model="userInfo.Phone01"></van-field>
      <van-field placeholder="请选择" label="与本人关系" :readonly="readonlyLoad" value-key="value"  @click="showPick(1)" input-align="right" v-model="userInfo.Relationship01" right-icon="arrow"></van-field>
    </div>
    <div class="OtherInfo-Content">
      <van-field placeholder="请选择从通讯录选择" label="姓名" :readonly="readonlyLoad" value-key="value" input-align="right" v-model="userInfo.Name02" right-icon="arrow"></van-field>
      <van-field type="text" label="联系方式" placeholder="请输入" :readonly="readonlyLoad" input-align="right"  v-model="userInfo.Phone02"></van-field>
      <van-field placeholder="请选择" label="与本人关系" :readonly="readonlyLoad" value-key="value" @click="showPick(2)" input-align="right" v-model="userInfo.Relationship02" right-icon="arrow"></van-field>
    </div>
    <div class="OtherInfo-Content">
      <van-field placeholder="请选择从通讯录选择" label="姓名" :readonly="readonlyLoad" value-key="value" input-align="right" v-model="userInfo.Name03" right-icon="arrow"></van-field>
      <van-field type="text" label="联系方式" placeholder="请输入" :readonly="readonlyLoad" input-align="right"  v-model="userInfo.Phone03"></van-field>
      <van-field placeholder="请选择" label="与本人关系" :readonly="readonlyLoad" value-key="value" @click="showPick(3)" input-align="right" v-model="userInfo.Relationship03" right-icon="arrow"></van-field>
    </div>
    <div class="edit-btn" v-show="readonlyLoad" @click="editReadonly">编辑</div>
    <div class="edit-btn" v-show="!readonlyLoad" @click="InfoNumber">完成</div>
    <div class="topPay"><img src="../../../assets/image/ic_shanghua.png">向上滑动提交信息</div>
    <!--弹框-->
    <van-popup :lazy-render="false" v-model="residencePop" position="bottom">
      <van-picker :columns="DataList" :loading="loading" show-toolbar value-key="value"  @cancel="onCancel" @confirm="onConfirm" />
    </van-popup>
  </div>
</template>
<script>
export default {
  name: 'Page03',
  data () {
    return {
      readonlyLoad: true,
      residencePop: false,
      loading: false,
      DataList: [], // 列表数据
      SelectData: [],
      showPickIndex: '',
      userInfo: {
        Name01: '',
        Phone01: '',
        Relationship01: '',
        RelationshipKey01: '',
        Name02: '',
        Phone02: '',
        Relationship02: '',
        RelationshipKey02: '',
        Name03: '',
        Phone03: '',
        Relationship03: '',
        RelationshipKey03: ''
      }
    }
  },
  created () {
    this.infoselect()
  },
  mounted () {
    setTimeout(() => {
      this.GetContacts()
    }, 1000)
  },
  methods: {
    // 修改状态
    editReadonly () {
      this.readonlyLoad = false
    },
    // 提交表单数据
    InfoNumber () {
      this.$axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8'
      this.$axios.defaults.headers.post['token'] = localStorage.getItem('token')
      this.$axios.post(this.GLOBAL.axIosUrl + '/api/addContacts', {
        list: [
          {
            userName: this.userInfo.Name01,
            userPhone: this.userInfo.Phone01,
            userRelation: this.userInfo.RelationshipKey01
          },
          {
            userName: this.userInfo.Name02,
            userPhone: this.userInfo.Phone02,
            userRelation: this.userInfo.RelationshipKey02
          },
          {
            userName: this.userInfo.Name03,
            userPhone: this.userInfo.Phone03,
            userRelation: this.userInfo.RelationshipKey03
          }
        ]
      })
        .then((res) => {
          res = res.data
          if (res.code === 200) {
            this.$toast.success('提交成功')
            this.readonlyLoad = true
          } else {
            this.$toast.success('提交失败')
          }
        })
        .catch((res) => {
          this.$toast.error('网络错误')
        })
    },
    // 获取
    infoselect () {
      this.$axios.defaults.headers.get['Content-Type'] = 'application/json;charset=utf-8'
      this.$axios.defaults.headers.get['token'] = localStorage.getItem('token')
      this.$axios.get(this.GLOBAL.axIosUrl + '/api/as/common/dictionary', {
        params: {
          dicKey: 'RELATIONSHIP'
        }
      })
        .then((res) => {
          res = res.data
          this.SelectData = res.data
        })
        .catch((res) => {
        })
    },
    // 获取联系人信息
    GetContacts (num) {
      this.$axios.defaults.headers.get['Content-Type'] = 'application/json;charset=utf-8'
      this.$axios.defaults.headers.get['token'] = localStorage.getItem('token')
      this.$axios.get(this.GLOBAL.axIosUrl + '/api/selectContacts')
        .then((res) => {
          res = res.data
          this.userInfo.Name01 = res.data[0].userName
          this.userInfo.Phone01 = res.data[0].userPhone
          this.userInfo.RelationshipKey01 = res.data[0].userRelation
          let strIndex01 = this.SelectData.map(item => item.key).indexOf(res.data[0].userRelation)
          this.userInfo.Relationship01 = this.SelectData[strIndex01].value
          this.userInfo.Name02 = res.data[1].userName
          this.userInfo.Phone02 = res.data[1].userPhone
          this.userInfo.RelationshipKey02 = res.data[1].userRelation
          let strIndex02 = this.SelectData.map(item => item.key).indexOf(res.data[1].userRelation)
          this.userInfo.Relationship02 = this.SelectData[strIndex02].value
          this.userInfo.Name03 = res.data[2].userName
          this.userInfo.Phone03 = res.data[2].userPhone
          this.userInfo.RelationshipKey03 = res.data[2].userRelation
          let strIndex03 = this.SelectData.map(item => item.key).indexOf(res.data[2].userRelation)
          this.userInfo.Relationship03 = this.SelectData[strIndex03].value
        })
        .catch((res) => {
        })
    },
    // 点击调取弹框接口
    showPick (num) {
      this.loading = true
      this.$emit('eventToch03', false)
      this.residencePop = true
      this.$axios.defaults.headers.get['Content-Type'] = 'application/json;charset=utf-8'
      this.$axios.defaults.headers.get['token'] = localStorage.getItem('token')
      this.$axios.get(this.GLOBAL.axIosUrl + '/api/as/common/dictionary', {
        params: {
          dicKey: 'RELATIONSHIP'
        }
      })
        .then((res) => {
          res = res.data
          this.DataList = res.data
          this.loading = false
          if (num === 1) {
            this.showPickIndex = 1
          }
          if (num === 2) {
            this.showPickIndex = 2
          }
          if (num === 3) {
            this.showPickIndex = 3
          }
        })
        .catch((res) => {
        })
    },
    // 确认弹框
    onConfirm (value) {
      this.$emit('eventToch03', true)
      if (this.showPickIndex === 1) {
        this.userInfo.Relationship01 = value.value
        this.userInfo.RelationshipKey01 = value.key
      }
      if (this.showPickIndex === 2) {
        this.userInfo.Relationship02 = value.value
        this.userInfo.RelationshipKey02 = value.key
      }
      if (this.showPickIndex === 3) {
        this.userInfo.Relationship03 = value.value
        this.userInfo.RelationshipKey03 = value.key
      }
      this.residencePop = false
    },
    // 取消弹框
    onCancel () {
      this.$emit('eventToch03', true)
      this.residencePop = false
    },
    onChange (picker, value, index) {
    }
  }
}
</script>
<style scoped>
  .box{
    width: 100%;
    height: 100%;
    background: #F6F6F6;
  }
  van-field::-webkit-input-placeholder{
    line-height:1rem!important;
  }
  .tip-top{
    height: .4rem;
    width: 100%;
    background: url("../../../assets/image/ic_xiala.png") no-repeat center center;
    background-size: .24rem .19rem;
  }
  .van-field{
    height: 1rem;
  }
  .formInfo-Content{
    padding: 0 .2rem;
    overflow: hidden;
    background: #FFFFFF;
  }
  .OtherInfo-Content{
    margin-top: .2rem;
    padding: 0 .2rem;
    overflow: hidden;
    background: #FFFFFF;
  }
  .topPay{
    width: 100%;
    height: .33rem;
    line-height: .33rem;
    font-weight:400;
    color: #AAAAAA;
    margin-top: .5rem;
    text-align: center;
  }
  .topPay img{
    width: .24rem;
    height: .19rem;
    margin-right: .2rem;
  }
  .edit-btn{
    border-radius: .5rem;
    border: 1px solid #CCCCCC;
    color: #CCCCCC;
    font-size: .3rem;
    height: .88rem;
    text-align: center;
    margin: .28rem .25rem 0 .25rem;
    line-height:  .88rem;
  }
</style>
