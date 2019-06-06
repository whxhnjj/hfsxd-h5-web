<template>
  <div class="box">
    <div class="tip-top"></div>
    <div class="formInfo-Content">
      <van-field placeholder="请选择" label="工作性质" readonly value-key="value" @click="showPick('NATURE_OF_WORK')" input-align="right" v-model="PageInfo.natureWork" right-icon="arrow"></van-field>
      <van-field type="text" label="单位名称" placeholder="请输入" input-align="right"  v-model="PageInfo.unitName"></van-field>
      <van-field placeholder="请选择" label="工作地址" readonly value-key="value" @click="showPickAddress" input-align="right" v-model="PageInfo.WorkAddress" right-icon="arrow"></van-field>
      <van-field type="text" label="工作详细地址" placeholder="请输入" input-align="right"  v-model="PageInfo.companyAddress"></van-field>
      <van-field type="text" label="单位电话" placeholder="请输入" input-align="right"  v-model="PageInfo.unitTel"></van-field>
      <van-field placeholder="请选择" label="职业" readonly value-key="value" @click="showPick('OCCUPATION')" input-align="right" v-model="PageInfo.career" right-icon="arrow"></van-field>
      <van-field placeholder="请选择" label="职位" readonly value-key="value" @click="showPick('PROD_ROLE')" input-align="right" v-model="PageInfo.position" right-icon="arrow"></van-field>
      <van-field placeholder="请选择" label="收入来源" readonly value-key="value" @click="showPick('Source_of_income')" input-align="right" v-model="PageInfo.sourceIncome" right-icon="arrow"></van-field>
      <van-field placeholder="请选择" label="月均收入" readonly value-key="value" @click="showPick('MONTHLY_INCOME')"  input-align="right" v-model="PageInfo.incomeRange" right-icon="arrow"></van-field>
    </div>
    <div class="OtherInfo-Content">
      <van-field placeholder="请选择" label="最高学历" readonly value-key="value" @click="showPick('education')"  input-align="right" v-model="PageInfo.education" right-icon="arrow"></van-field>
      <van-field type="text" label="学校名称" placeholder="请输入学校名称(非必填)" input-align="right"  v-model="PageInfo.school"></van-field>
    </div>
    <div class="submit" @click="SubmitInfo">确认授信</div>
    <!--弹框-->
    <van-popup :lazy-render="false" v-model="DataPop" position="bottom">
      <van-picker :columns="DataList"  show-toolbar value-key="value"  @cancel="onCancel" @confirm="onConfirm" />
    </van-popup>
    <!--省市区-->
    <van-popup v-model="AddressPop" position="bottom" :overlay="true">
      <van-area :area-list="areaList" @confirm="onAreaConfirm" @cancel="onAreaCancel" />
    </van-popup>
  </div>
</template>
<script>
export default {
  name: 'Page04',
  data () {
    return {
      tochanfys: {
        PopPage04: '',
        xieyiPage04: ''
      },
      DataPop: false,
      AddressPop: false,
      value: '',
      showPickIndex: '',
      DataList: [],
      areaList: {},
      PageInfo: {
        natureWork: '', // 工作性质
        natureWorkKey: '',
        unitName: '', // 单位名称
        proviceCode: '', // code码
        cityCode: '',
        districtCode: '',
        proviceName: '', // 地址中文
        cityName: '', //
        districtName: '', //
        WorkAddress: '', // 工作地址
        companyAddress: '', // 工作详细地址
        unitTel: '', // 单位电话
        career: '', // 职业
        careerKey: '',
        position: '', // 职位
        positionKey: '',
        sourceIncome: '', // 收入来源
        sourceIncomeKey: '',
        incomeRange: '', // 月均收入
        incomeRangeKey: '',
        education: '', // 最高学历
        educationKey: '',
        school: '' // 学校名称
      }
    }
  },
  created () {
    this.getProvinceCityDistrict()
    this.getDataInfo()
  },
  mounted () {
    this.GetDataInFoSelect('NATURE_OF_WORK') //
    this.GetDataInFoSelect('OCCUPATION')//
    this.GetDataInFoSelect('PROD_ROLE')//
    this.GetDataInFoSelect('Source_of_income') // 收入来源
    this.GetDataInFoSelect('MONTHLY_INCOME')// 月均收入
    this.GetDataInFoSelect('education')// 最高学历
  },
  methods: {
    // 读取弹出框接口数据
    GetDataInFoSelect (val) {
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
            if (val === 'NATURE_OF_WORK') {
              let arr01 = res.data
              let strIndex01 = arr01.map(item => item.key).indexOf(this.PageInfo.natureWorkKey)
              this.PageInfo.natureWork = arr01[strIndex01].value
            }
            if (val === 'OCCUPATION') {
              let arr02 = res.data
              let strIndex02 = arr02.map(item => item.key).indexOf(this.PageInfo.careerKey)
              this.PageInfo.career = arr02[strIndex02].value
            }
            if (val === 'PROD_ROLE') {
              let arr03 = res.data
              let strIndex03 = arr03.map(item => item.key).indexOf(this.PageInfo.positionKey)
              this.PageInfo.position = arr03[strIndex03].value
            }
            if (val === 'Source_of_income') {
              let arr04 = res.data
              let strIndex04 = arr04.map(item => item.key).indexOf(this.PageInfo.sourceIncomeKey)
              this.PageInfo.sourceIncome = arr04[strIndex04].value
            }
            if (val === 'MONTHLY_INCOME') {
              let arr05 = res.data
              let strIndex05 = arr05.map(item => item.key).indexOf(this.PageInfo.incomeRangeKey)
              this.PageInfo.incomeRange = arr05[strIndex05].value
            }
            if (val === 'education') {
              let arr06 = res.data
              let strIndex06 = arr06.map(item => item.key).indexOf(this.PageInfo.educationKey)
              this.PageInfo.education = arr06[strIndex06].value
            }
          }
        })
        .catch((res) => {
        })
    },
    // 获取表单数据
    getDataInfo () {
      this.$axios.defaults.headers.get['Content-Type'] = 'application/json;charset=utf-8'
      this.$axios.defaults.headers.get['token'] = localStorage.getItem('token')
      this.$axios.get(this.GLOBAL.axIosUrl + '/api/selectWorkInfo')
        .then((res) => {
          res = res.data
          this.PageInfo.natureWorkKey = res.data.natureWork
          this.PageInfo.unitName = res.data.unitName
          this.PageInfo.proviceCode = res.data.proviceCode
          this.PageInfo.cityCode = res.data.cityCode
          this.PageInfo.districtCode = res.data.districtCode
          this.PageInfo.proviceName = res.data.proviceName
          this.PageInfo.cityName = res.data.cityName
          this.PageInfo.districtName = res.data.districtName
          this.PageInfo.WorkAddress = res.data.proviceName + res.data.cityName + res.data.districtName
          this.PageInfo.companyAddress = res.data.companyAddress
          this.PageInfo.unitTel = res.data.unitTel
          this.PageInfo.careerKey = res.data.career
          this.PageInfo.sourceIncomeKey = res.data.sourceIncome
          this.PageInfo.positionKey = res.data.position
          this.PageInfo.incomeRangeKey = res.data.incomeRange
          this.PageInfo.educationKey = res.data.education
          this.PageInfo.school = res.data.school
        })
        .catch((res) => {
        })
    },
    // 点击调取弹框接口
    showPick (val) {
      this.tochanfys.PopPage04 = false
      this.$emit('eventToch04', this.tochanfys)
      this.DataPop = true
      this.$axios.defaults.headers.get['Content-Type'] = 'application/json;charset=utf-8'
      this.$axios.defaults.headers.get['token'] = localStorage.getItem('token')
      this.$axios.get(this.GLOBAL.axIosUrl + '/api/as/common/dictionary', {
        params: {
          dicKey: val
        }
      })
        .then((res) => {
          res = res.data
          this.DataList = res.data
          if (val === 'NATURE_OF_WORK') { // 工作性质
            this.showPickIndex = 1
          }
          if (val === 'OCCUPATION') { // 职业
            this.showPickIndex = 2
          }
          if (val === 'PROD_ROLE') { // 职位
            this.showPickIndex = 3
          }
          if (val === 'Source_of_income') { // 收入来源
            this.showPickIndex = 4
          }
          if (val === 'MONTHLY_INCOME') { // 月均收入
            this.showPickIndex = 5
          }
          if (val === 'education') { // 最高学历
            this.showPickIndex = 6
          }
        })
        .catch((res) => {
        })
    },
    // 确认弹框
    onConfirm (value) {
      this.tochanfys.PopPage04 = true
      this.$emit('eventToch04', this.tochanfys)
      if (this.showPickIndex === 1) { // 工作性质
        this.PageInfo.natureWork = value.value
        this.PageInfo.natureWorkKey = value.key
      }
      if (this.showPickIndex === 2) { // 职业
        this.PageInfo.career = value.value
        this.PageInfo.careerKey = value.key
      }
      if (this.showPickIndex === 3) { // 职位
        this.PageInfo.position = value.value
        this.PageInfo.positionKey = value.key
      }
      if (this.showPickIndex === 4) { // 收入来源
        this.PageInfo.sourceIncome = value.value
        this.PageInfo.sourceIncomeKey = value.key
      }
      if (this.showPickIndex === 5) { // 月均收入
        this.PageInfo.incomeRange = value.value
        this.PageInfo.incomeRangeKey = value.key
      }
      if (this.showPickIndex === 6) { // 最高学历
        this.PageInfo.education = value.value
        this.PageInfo.educationKey = value.key
      }
      this.DataPop = false
    },
    // 取消弹框
    onCancel () {
      this.tochanfys.PopPage04 = true
      this.$emit('eventToch04', this.tochanfys)
      this.DataPop = false
    },
    // 提交表单
    SubmitInfo () {
      this.$axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8'
      this.$axios.defaults.headers.post['token'] = localStorage.getItem('token')
      this.$axios.post(this.GLOBAL.axIosUrl + '/api/addWorkInfo', {
        natureWork: this.PageInfo.natureWorkKey, // 工作性质
        unitName: this.PageInfo.unitName, // 单位名称
        proviceCode: this.PageInfo.proviceCode, // code码
        cityCode: this.PageInfo.cityCode,
        districtCode: this.PageInfo.districtCode,
        proviceName: this.PageInfo.proviceName, // 地址中文
        cityName: this.PageInfo.cityName, //
        districtName: this.PageInfo.districtName, //
        companyAddress: this.PageInfo.companyAddress, // 工作详细地址
        unitTel: this.PageInfo.unitTel, // 单位电话
        career: this.PageInfo.careerKey, // 职业
        position: this.PageInfo.positionKey, // 职位
        sourceIncome: this.PageInfo.sourceIncomeKey, // 收入来源
        incomeRange: this.PageInfo.incomeRangeKey, // 月均收入
        education: this.PageInfo.educationKey, // 最高学历
        school: this.PageInfo.school // 学校名称
      })
        .then((res) => {
          res = res.data
          if (res.code === 202) {
            this.tochanfys.xieyiPage04 = true
            this.$emit('eventToch04', this.tochanfys)
          }
        })
        .catch((res) => {
        })
    },
    // 弹出省市区弹框
    showPickAddress () {
      this.AddressPop = true
      this.tochanfys.PopPage04 = false
      this.$emit('eventToch04', this.tochanfys)
    },
    // 获取省市区
    getProvinceCityDistrict () {
      this.$axios.defaults.headers.get['Content-Type'] = 'application/json;charset=utf-8'
      this.$axios.defaults.headers.get['token'] = localStorage.getItem('token')
      this.$axios.get(this.GLOBAL.axIosUrl + '/api/as/common/location/provinceCityDistrict')
        .then((res) => {
          res = res.data
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
      this.PageInfo.WorkAddress = value[0].name + value[1].name + value[2].name
      this.PageInfo.proviceName = value[0].name
      this.PageInfo.cityName = value[1].name
      this.PageInfo.districtName = value[2].name
      this.PageInfo.proviceCode = value[0].code
      this.PageInfo.cityCode = value[1].code
      this.PageInfo.districtCode = value[2].code
      this.tochanfys.PopPage04 = true
      this.$emit('eventToch04', this.tochanfys)
      this.AddressPop = false
    },
    onAreaCancel () {
      this.tochanfys.PopPage04 = true
      this.$emit('eventToch04', this.tochanfys)
      this.AddressPop = false
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
  .submit{
    width: 80%;
    height: .88rem;
    background:linear-gradient(310deg,rgba(255,140,104,1) 0%,rgba(253,186,117,1) 100%);
    border-radius:44px;
    color: #FFFFFF;
    font-size: .3rem;
    line-height: .88rem;
    text-align: center;
    margin: .3rem auto;
  }
</style>
