<template>
  <div class="box">
    <div class="tip-top"></div>
    <div class="formInfo-Content">
      <van-field placeholder="请选择" label="户口性质" readonly @click="showPick('HOUSEHOLD')" input-align="right" v-model="PageInfo.residenceId" right-icon="arrow"></van-field>
      <van-field placeholder="请选择" label="婚烟状态" readonly @click="showPick('marriStatus')" input-align="right" v-model="PageInfo.maritalId" right-icon="arrow"></van-field>
      <van-field type="text" input-align="right" label="配偶姓名" :readonly="readonlyLoad" placeholder="请输入配偶姓名" v-model="PageInfo.spouseName"></van-field>
      <van-field type="text" input-align="right" label="身份证号" :readonly="readonlyLoad" placeholder="请输入配偶身份证号" v-model="PageInfo.spouseIdcard"></van-field>
      <van-field placeholder="请选择" label="现居地状况" readonly input-align="right" @click="showPick('GENERALTYPE')" v-model="PageInfo.currentAddressStatus" right-icon="arrow"></van-field>
      <van-field placeholder="请选择" label="现居地址" readonly  @click="showPickAddress" input-align="right" v-model="PageInfo.currentAddress" right-icon="arrow"></van-field>
      <van-field type="text" input-align="right" :readonly="readonlyLoad" placeholder="请输入街道、门牌号等" label="详细地址" v-model="PageInfo.livingAddress"></van-field>
    </div>
    <div class="OtherInfo-Content">
      <van-field type="text" input-align="right" label="QQ"   :readonly="readonlyLoad" placeholder="请输入QQ号码" v-model="PageInfo.qqNo"></van-field>
      <van-field type="text" input-align="right" label="微信" :readonly="readonlyLoad" placeholder="请输入微信号或点击右侧上传微信名片" v-model="PageInfo.wechat"></van-field>
      <van-field type="text" input-align="right" label="邮箱" :readonly="readonlyLoad" placeholder="请输入常用邮箱" v-model="PageInfo.email"></van-field>
    </div>
    <div class="edit-btn" v-show="readonlyLoad" @click="editReadonly">编辑</div>
    <div class="edit-btn" v-show="!readonlyLoad" @click="SubmitInfo">完成</div>
    <div class="topPay"><img src="../../../assets/image/ic_shanghua.png">向上滑动提交信息</div>
    <!--户口弹框-->
    <van-popup :lazy-render="false" v-model="residencePop" position="bottom">
      <van-picker :columns="residence" :loading="loading" show-toolbar value-key="value"  @cancel="onCancel" @confirm="onConfirm" />
    </van-popup>
    <!--省市区-->
    <van-popup v-model="AddressPop" position="bottom" :overlay="true">
      <van-area :area-list="areaList" :loading="loading" @confirm="onAreaConfirm" @cancel="onAreaCancel" />
    </van-popup>
  </div>
</template>
<script>
export default {
  name: 'Page02',
  data () {
    return {
      readonlyLoad: true,
      PageInfo: {
        residenceId: '', // 户口性质
        residenceIdKey: '', // 户口key值
        maritalId: '', // 婚姻
        maritalIdKey: '', // 婚姻key值
        spouseName: '', // 配偶姓名
        spouseIdcard: '', // 配偶身份证号
        currentAddressStatus: '', // 现居地址状况10,自购现无贷款20,自购现有贷款30,租房
        currentAddressStatusKey: '',
        currentAddress: '', // 现居地址
        livingProvince: '', // 现居地址省
        livingCity: '', // 现居地址shi
        livingDistrict: '', // 现居住地区
        livingProvinceCode: '', // 现居地址省
        livingCityCode: '', // 现居地址shi
        livingDistrictCode: '', // 现居住地区
        livingAddress: '', // 现居住详细地址
        qqNo: '', // qq
        wechat: '', // 微信
        email: '' // 邮箱
      },
      residence: [], // 列表数据
      showPickIndex: '',
      residencePop: false, // 弹框
      //  --------
      loading: false,
      AddressPop: false,
      areaList: {},
      DataList: [],
      DataList01: [], // 读取列表数据，赋值文字到文本框
      DataList02: [], // 读取列表数据，赋值文字到文本框
      DataList03: []
    }
  },
  created () {
    this.GetDataInfo()
  },
  mounted () {
    // 省市区
    this.getProvinceCityDistrict()
    this.GetDataInFoTetx('HOUSEHOLD') // 户口性质
    this.GetDataInFoTetx('marriStatus')// 婚姻状态
    this.GetDataInFoTetx('GENERALTYPE')// 现居住地状况
  },
  methods: {
    // 修改状态
    editReadonly () {
      this.readonlyLoad = false
    },
    SubmitInfo () {
      this.$axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8'
      this.$axios.defaults.headers.post['token'] = localStorage.getItem('token')
      this.$axios.post(this.GLOBAL.axIosUrl + '/api/addInfo', {
        residenceId: this.PageInfo.residenceIdKey,
        maritalId: this.PageInfo.maritalIdKey,
        spouseName: this.PageInfo.spouseName,
        spouseIdcard: this.PageInfo.spouseIdcard,
        currentAddressStatus: this.PageInfo.currentAddressStatusKey,
        livingProvince: this.PageInfo.livingProvince,
        livingCity: this.PageInfo.livingCity,
        livingDistrict: this.PageInfo.livingDistrict,
        livingProvinceCode: this.PageInfo.livingProvinceCode,
        livingCityCode: this.PageInfo.livingCityCode,
        livingDistrictCode: this.PageInfo.livingDistrictCode,
        livingAddress: this.PageInfo.livingAddress,
        qqNo: this.PageInfo.qqNo,
        wechat: this.PageInfo.wechat,
        email: this.PageInfo.email
      })
        .then((res) => {
          res = res.data
          if (res.code === 200) {
            this.$toast.success('提交成功')
            localStorage.setItem('businessNo', res.data.businessNo)
            this.readonlyLoad = true
          } else {
            this.$toast.success('提交失败')
          }
        })
        .catch((res) => {
          this.$toast.error('网络错误')
        })
    },
    // 读取弹出框接口数据
    GetDataInFoTetx (val) {
      this.$axios.defaults.headers.get['Content-Type'] = 'application/json;charset=utf-8'
      this.$axios.defaults.headers.get['token'] = localStorage.getItem('token')
      this.$axios.get(this.GLOBAL.axIosUrl + '/api/as/common/dictionary', {
        params: {
          dicKey: val
        }
      })
        .then((res) => {
          res = res.data
          if (res.code === 200) {
            this.DataList = res.data
            if (val === 'HOUSEHOLD') {
              this.DataList01 = res.data
              var strIndex01 = this.DataList01.map(item => item.key).indexOf(this.PageInfo.residenceId)
              this.PageInfo.residenceId = this.DataList01[strIndex01].value
            }
            if (val === 'marriStatus') {
              this.DataList02 = res.data
              var strIndex02 = this.DataList02.map(item => item.key).indexOf(this.PageInfo.maritalId)
              this.PageInfo.maritalId = this.DataList02[strIndex02].value
            }
            if (val === 'GENERALTYPE') {
              this.DataList03 = res.data
              var strIndex03 = this.DataList03.map(item => item.key).indexOf(this.PageInfo.currentAddressStatus.toString())
              this.PageInfo.currentAddressStatus = this.DataList03[strIndex03].value
            }
          }
        })
        .catch((res) => {
        })
    },
    // 获取已填写信息数据
    GetDataInfo () {
      this.$toast.loading({
        mask: true,
        message: '加载中...'
      })
      this.$axios.defaults.headers.get['Content-Type'] = 'application/json;charset=utf-8'
      this.$axios.defaults.headers.get['token'] = localStorage.getItem('token')
      this.$axios.get(this.GLOBAL.axIosUrl + '/api/selectInfo', {
      })
        .then((res) => {
          res = res.data
          if (res.code === 200) {
            this.PageInfo = res.data
            this.PageInfo.residenceIdKey = res.data.residenceId
            this.PageInfo.maritalIdKey = res.data.maritalId
            this.PageInfo.currentAddressStatusKey = res.data.currentAddressStatus
            this.PageInfo.currentAddress = res.data.livingProvince + res.data.livingCity + res.data.livingDistrict
            this.$toast.loading({
              mask: false,
              message: '加载中...'
            })
          }
        })
        .catch((res) => {
          // console.log(res)
        })
    },
    // 弹出选择框
    showPick (val) {
      this.$emit('wangjieclck', false)
      this.residencePop = true
      this.GetDataInFoPick(val)
      if (val === 'HOUSEHOLD') {
        this.showPickIndex = 1
      }
      if (val === 'marriStatus') {
        this.showPickIndex = 2
      }
      if (val === 'GENERALTYPE') {
        this.showPickIndex = 3
      }
    },
    // 确认弹框
    onConfirm (value) {
      this.$emit('wangjieclck', true)
      if (this.showPickIndex === 1) {
        this.PageInfo.residenceId = value.value
        this.PageInfo.residenceIdKey = value.key
      }
      if (this.showPickIndex === 2) {
        this.PageInfo.maritalId = value.value
        this.PageInfo.maritalIdKey = value.key
      }
      if (this.showPickIndex === 3) {
        this.PageInfo.currentAddressStatus = value.value
        this.PageInfo.currentAddressStatusKey = value.key
      }
      this.residencePop = false
    },
    // 取消弹框
    onCancel () {
      this.$emit('wangjieclck', true)
      this.residencePop = false
    },
    // 公共弹出框接口数据
    GetDataInFoPick (val) {
      this.loading = true
      this.$axios.defaults.headers.get['Content-Type'] = 'application/json;charset=utf-8'
      this.$axios.defaults.headers.get['token'] = localStorage.getItem('token')
      this.$axios.get(this.GLOBAL.axIosUrl + '/api/as/common/dictionary', {
        params: {
          dicKey: val
        }
      })
        .then((res) => {
          res = res.data
          if (res.code === 200) {
            this.residence = res.data
            this.loading = false
          }
        })
        .catch((res) => {
        })
    },
    showPickAddress () {
      this.AddressPop = true
      this.$emit('wangjieclck', false)
    },
    // 获取省市区
    getProvinceCityDistrict () {
      this.loading = true
      this.$axios.defaults.headers.get['Content-Type'] = 'application/json;charset=utf-8'
      this.$axios.defaults.headers.get['token'] = localStorage.getItem('token')
      this.$axios.get(this.GLOBAL.axIosUrl + '/api/as/common/location/provinceCityDistrict')
        .then((res) => {
          res = res.data
          this.loading = false
          let province_list = {}
          let city_list = {}
          let county_list = {}
          res.data.forEach(province => {
            province_list[province.value] = province.label
            if (province.children && province.children.length) {
              let cityChildren = province.children
              cityChildren.forEach(city => {
                city_list[city.value] = city.label
                if (city.children && city.children.length) {
                  let countryChilren = city.children
                  countryChilren.forEach(country => {
                    county_list[country.value] = country.label
                  })
                }
              })
            }
          })
          this.areaList = Object.assign({}, {province_list}, {city_list}, {county_list})
        })
        .catch((res) => {
        })
    },
    onAreaConfirm (value) {
      this.PageInfo.currentAddress = value[0].name + value[1].name + value[2].name
      this.PageInfo.livingProvince = value[0].name
      this.PageInfo.livingCity = value[1].name
      this.PageInfo.livingDistrict = value[2].name
      this.PageInfo.livingProvinceCode = value[0].code
      this.PageInfo.livingCityCode = value[1].code
      this.PageInfo.livingDistrictCode = value[2].code
      this.$emit('wangjieclck', true)
      this.AddressPop = false
    },
    onAreaCancel () {
      this.$emit('wangjieclck', true)
      this.AddressPop = false
    }
  }
}
</script>
<style scoped>
  .box{
    width: 100%;
    background: #F6F6F6;
  }
  input::-webkit-input-placeholder{
    line-height:1rem;
  }
  .tip-top{
    height: .4rem;
    width: 100%;
    background: url("../../../assets/image/ic_xiala.png") no-repeat center center;
    background-size: .24rem .19rem;
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
    margin-top: 1rem;
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
    line-height: .88rem;
  }
</style>
