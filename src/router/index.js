import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/Home'
    },
    {
      path: '/Home',
      name: 'Home',
      component: () => import('../page/Home/Home'),
      meta: {
        title: '首页'
      }
    },
    {
      path: '/Credit',
      name: 'Credit',
      component: () => import('../page/Home/Credit'),
      meta: {
        title: '恒丰授信'
      }
    },
    {
      path: '/Card',
      name: 'Card',
      component: () => import('../page/Home/Card'),
      meta: {
        title: '支持银行卡'
      }
    },
    {
      path: '/Borrow',
      name: 'Borrow',
      component: () => import('../page/Borrow/Borrow'),
      meta: {
        title: '我要借款'
      }
    },
    {
      path: '/RepaymentPlan',
      name: 'RepaymentPlan',
      component: () => import('../page/Borrow/RepaymentPlan'),
      meta: {
        title: '还款计划'
      }
    },
    {
      path: '/Code',
      name: 'Code',
      component: () => import('../page/Borrow/Code'),
      meta: {
        title: '请输入验证码'
      }
    },
    {
      path: '/Signing',
      name: 'Signing',
      component: () => import('../page/Borrow/Signing'),
      meta: {
        title: '签约'
      }
    },
    {
      path: '/Result',
      name: 'Result',
      component: () => import('../page/Borrow/Result'),
      meta: {
        title: '借款结果'
      }
    }
  ]
})
