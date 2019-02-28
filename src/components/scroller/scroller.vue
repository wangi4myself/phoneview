<template>
  <div>
      <div class="wrapper" ref="wrapper">
          <div ref="listWrapper">
            <slot></slot>
          </div>
      </div>
      <div v-if="pullingUpEnd" class="pullingUpEnd">已经到底部了 ：）</div>
  </div>
</template>

<script>
import Bscroll from 'better-scroll'
export default {
    name:'scroller',
    data(){
      return{
        isPullUpLoad:false,
        pullUpLoad:true,
        pullingUpEnd:false,
      }
    },
    props:{
      list:{
        type:Array,
        default:[],
      }
    },
    mounted(){
      this.initScroll()
    },
    methods:{
      _initPullDownRefresh () {
            this.scroll.on('pullingDown', () => {
                this.scroll.finishPullDown()
            })
        },
      _initPullUpLoad () {
          this.scroll.on('pullingUp', () => {
              this.isPullUpLoad = true
              // this.getList()
              this.$emit('pullingUp')
          })
      },
      refresh (){
            this.scroll && this.scroll.refresh()
      },
      offPullingUp(){
            this.scroll && this.scroll.off('pullingUp')
            this.pullingUpEnd=true
      },
      forceUpdate(dirty) {
          if (this.isPullUpLoad) {
              this.isPullUpLoad = false
              this.scroll.finishPullUp()
              this.refresh()
          } else {
              this.refresh()
          }
      },
      getRect (el) {
            if (el instanceof window.SVGElement) {
                let rect = el.getBoundingClientRect()
                return {
                  top: rect.top,
                  left: rect.left,
                  width: rect.width,
                  height: rect.height
                }
            } else {
                return {
                  top: el.offsetTop,
                  left: el.offsetLeft,
                  width: el.offsetWidth,
                  height: el.offsetHeight
                }
            }
      },
      initScroll(){
            if (!this.$refs.wrapper) {
                return
            }
            let options = {
                probeType: 1,
                click: true,
                scrollY: true,
                scrollbar: true,
                pullDownRefresh: true,
                pullUpLoad: this.pullUpLoad
            }
            this.$nextTick(() => {
                this.scroll = new Bscroll(this.$refs.wrapper, options)
                this.$refs.listWrapper.style.minHeight = `${this.getRect(this.$refs.wrapper).height + 1}px`
                if (options.pullDownRefresh) {
                    this._initPullDownRefresh()
                }
                if (options.pullUpLoad) {
                    this._initPullUpLoad()
                }
            })
        }
    },
    watch:{
        list(){
            setTimeout(()=>{
                this.forceUpdate()
            },20)
        }
    }
}
</script>

<style lang="less">
  .wrapper{
          position: absolute;
          width:100%;
          top:42px;
          left:0;
          bottom:0;
          height: 100vh;
          overflow:hidden;
          
  }
  .pullingUpEnd{
      text-align: center;
      margin-top: 1em;
  }    
  
</style>


