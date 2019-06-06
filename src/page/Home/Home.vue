<template>
  <div>
    <div class="steps">
      <div class="loading" v-bind:style="{width: widthSteps + '%' }"></div>
    </div>
    <div class="wrapper" ref="wrapper" v-bind:style="{height: swiperheight + 'rem' }">
      <div class="content">
        <div v-if="BoxIndex === 1"><Page01></Page01></div>
        <div v-if="BoxIndex === 2"><Page02></Page02></div>
        <div v-if="BoxIndex === 3"><Page03></Page03></div>
        <div v-if="BoxIndex === 4"><Page04 @eventToch04="eventToch04"></Page04></div>
      </div>
    </div>
    <div v-if="Page05Box" class="box-Pop">
      <Page05></Page05>
    </div>
  </div>
</template>

<script>
import Page01 from './components/Page01'
import Page02 from './components/Page02'
import Page03 from './components/Page03'
import Page04 from './components/Page04'
import Page05 from './components/Page05'
import BScroll from 'better-scroll'
export default {
  name: 'Home',
  components: {
    Page01,
    Page02,
    Page03,
    Page04,
    Page05
  },
  data () {
    return {
      Page05Box: false, // 默认授信协议隐藏
      BoxIndex: 1,
      widthSteps: '25',
      swiperheight: (document.documentElement.clientHeight * 2) / 100 - 0.04
    }
  },
  watch: {
    // 监听数据的变化，延时refreshDelay时间后调用refresh方法重新计算，保证滚动效果正常
    data () {
      setTimeout(() => {
        this.BS()
      }, this.refreshDelay)
    }
  },
  props: {
    /**
     * 1 滚动的时候会派发scroll事件，会截流。
     * 2 滚动的时候实时派发scroll事件，不会截流。
     * 3 除了实时派发scroll事件，在swipe的情况下仍然能实时派发scroll事件
     */
    probeType: {
      type: Number,
      default: 3
    },
    /**
     * 点击列表是否派发click事件
     */
    click: {
      type: Boolean,
      default: true
    },
    /**
     * 是否开启横向滚动
     */
    scrollX: {
      type: Boolean,
      default: false
    },
    /**
     * 是否派发滚动事件
     */
    listenScroll: {
      type: Boolean,
      default: false
    },
    /**
     * 列表的数据
     */
    data: {
      type: Array,
      default: null
    },
    /**
     * 是否派发滚动到底部的事件，用于上拉加载
     */
    pullup: {
      type: Boolean,
      default: true
    },
    /**
     * 是否派发顶部下拉的事件，用于下拉刷新
     */
    pulldown: {
      type: Boolean,
      default: true
    },
    /**
     * 是否派发列表滚动开始的事件
     */
    beforeScroll: {
      type: Boolean,
      default: false
    },
    /**
     * 当数据更新后，刷新scroll的延时。
     */
    refreshDelay: {
      type: Number,
      default: 20
    }
  },
  mounted () {
    setTimeout(() => {
      this.BS()
    }, 20)
  },
  methods: {
    eventToch04 (val) {
      this.Page05Box = val.xieyiPage04
    },
    BS () {
      if (!this.$refs.wrapper) {
        return
      }
      // better-scroll的初始化
      this.scroll = new BScroll(this.$refs.wrapper, {
        probeType: this.probeType,
        click: this.click,
        scrollX: this.scrollX
      })
      this.scroll.on('scroll', pos => {
        this.scroll.hasVerticalScroll = true
      })
      // touchEnd 通过这个方法来监听下拉刷新
      this.scroll.on('touchEnd', pos => {
        // 下拉动作
        if (pos.y > 50) {
          if (this.BoxIndex === 2 || this.BoxIndex === 3 || this.BoxIndex === 4) {
            this.BoxIndex = this.BoxIndex - 1
          }
        }
        if (this.scroll.maxScrollY > pos.y + 10) {
          console.log(this.BoxIndex)
          // 上拉加载
          if (this.BoxIndex === 1 || this.BoxIndex === 2 || this.BoxIndex === 3) {
            this.BoxIndex = this.BoxIndex + 1
          }
        }
        if (this.BoxIndex === 1) {
          this.widthSteps = 25
          document.title = '人脸验证'
        }
        if (this.BoxIndex === 2) {
          this.widthSteps = 50
          document.title = '基础信息'
        }
        if (this.BoxIndex === 3) {
          this.widthSteps = 75
          document.title = '联系人'
        }
        if (this.BoxIndex === 4) {
          this.widthSteps = 100
          document.title = '教育经历'
        }
      })
    }
  }
}
</script>

<style scoped>
  .steps{
    width: 100%;
    height: .04rem;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999999;
  }
  .loading{
    height: 100%;
    background: #FF6332;
  }
  /*<!---->上拉加载下拉刷新*/
  .wrapper {
    width: 100%;
    height: 100%;
    position: absolute;
    overflow: hidden;
    left: 0;
    top: 0;
  }
  .wrapper .content {
    width:100%;
  }
  .box-Pop{
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    background: rgba(0,0,0,0.6);
    z-index: 9999999999999!important;
  }

</style>
