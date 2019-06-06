<template>
  <div>
  <div class="box" v-bind:style="{height: Page05Height + 'rem' }">
    <p class="text-center"><b class="f-16">个人征信授权书</b></p>
    <p>重要提示：</p>
    <p>为了保障您的合法权益，您应当阅读并遵守本授权书，请您务必仔细阅读、充分理解本授权书条款内容，特别是免除或者减轻恒丰银行（以下简称为“被授权人”或“贷款方”）责任，或限制您权利的条款，其中免除或者减轻责任条款可能以加粗形式提示您注意。</p>
    <p>除非您已阅读并接受本授权书所有条款，否则您无权使用本贷款服务。您的使用、登录等行为即视为您已阅读并同意本授权书条款的约束。</p>
    <p>恒丰银行股份有限公司西安分行：</p>
    <p>一、本人同意并不可撤销地授权：贷款方按照国家相关规定采集符合法律法规规定的本人个人信息及包括信贷信息在内的信用信息（含本人在贷款方处办理业务时产生的不良信息），并可以向中国人民银行金融信用信息基础数据库提供以上信息。</p>
    <p>二、本人同意并不可撤销地授权：贷款方可以根据国家有关规定，在办理涉及本人的业务时，自本授权书签署之日通过中国人民银行金融信用信息基础数据库查询、打印、保存、使用本人的信用报告、个人信息和包括信贷信息在内的信用信息，用于以下用途：</p>
    <p>（一）审核本人授信业务或用信申请；</p>
    <p>（二）对已发放的个人信贷进行贷后管理、不良资产处置等风险管理；</p>
    <p>（三）处理本人征信异议。</p>
    <p>授权人声明：</p>
    <p>本授权书是本人向贷款方做出的单方承诺，效力具有独立性，不因本人签署的授信或借款合同的任何条款无效而失效。若贷款方超出本授权范围进行查询使用，则贷款方应承担与此相关的法律责任。</p>
    <p>以上授权期限为本人做出本授权承诺之日起至本人在贷款方处所有业务终结之日止。本人在贷款方处有借款额度但无借款余额的情况下，本人与贷款方的业务关系仍然存续，贷款方仍有权向中国人民银行金融信用信息基础数据库查询、上报本人的信用信息。</p>
    <p>上述授权事项覆盖贷款方对上述用途相关的必要业务管理环节（如受理、调查、审查审批、贷后管理、资产处理、内外部审计/检查等）。</p>
    <p>若本人与贷款方发生任何纠纷或争议，首先应友好协商解决；协商不成的，可将纠纷或争议提交有管辖权的国家有权机构。本授权书的成立、生效、履行、解释及纠纷解决，适用中华人民共和国大陆地区法律（不包括台湾、香港、澳门地区的法律）。</p>
    <p>本人已知悉本授权书所有内容（特别是加粗字体内容）的意义以及由此产生的法律效力，自愿做出上述授权。本授权书是本人真实的意思表示，本人同意承担由此带来的一切法律后果。</p>
    <p>特此授权！</p>
    <p>授权人姓名：<span style="border-bottom: 1px solid #CCCCCC;padding-bottom: .05rem;">{{main.userName}}</span></p>
    <p>证件类型：身份证</p>
    <p>证件号码：<span style="border-bottom: 1px solid #CCCCCC;padding-bottom: .05rem;">{{main.identityCardNumber}}</span></p>
    <p>授权书签署日期：<span style="border-bottom: 1px solid #CCCCCC;padding-bottom: .05rem;">{{main.currentTime}}</span></p>
    <p style="height: 1rem;"></p>
  </div>
  <div class="button-sb" @click="Onclicktongyi">同意</div>
  </div>
</template>

<script>
export default {
  name: 'Page05',
  data () {
    return {
      main: {},
      Page05Height: (document.documentElement.clientHeight * 2) / 100 - 2.6
    }
  },
  created () {
    this.getDataInfo()
  },
  methods: {
    Onclicktongyi () {
      this.$router.push({path: '/Credit'})
    },
    getDataInfo () {
      this.$axios.defaults.headers.get['Content-Type'] = 'application/json;charset=utf-8'
      this.$axios.defaults.headers.get['token'] = localStorage.getItem('token')
      this.$axios.get(this.GLOBAL.axIosUrl + '/api/assess/userinfo')
        .then((res) => {
          res = res.data
          this.main = res.data
        })
        .catch((res) => {
        })
    }
  }
}
</script>

<style scoped>
  .box{
    width: 76%;
    margin: 1rem 10%;
    background: #FFFFFF;
    padding: .3rem 2%;
    border-radius: .25rem;
    overflow-y:scroll;
  }
  .button-sb {
    position: fixed;
    bottom: 1.2rem;
    width: 3rem;
    height: .6rem;
    left: 50%;
    margin-left: -1.5rem;
    background: #FFA219;
    text-align: center;
    line-height: .6rem;
    color: #FFFFFF;
    border-radius: .15rem;
    font-size: .25rem;
  }
  .f-16{
    font-size: 16px;
  }
  .text-center{
    text-align: center;
  }
  p{
    text-indent: 20px;
    line-height: 26px;
  }
</style>
