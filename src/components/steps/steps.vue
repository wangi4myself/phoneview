<template>
    <div :class="classes">
        <slot></slot>
    </div>
</template>

<script>
import { oneOf } from '@/tools/assist';
const prefixCls = 'ivu-steps';
export default {
    name: 'Steps',
    computed: {
        classes () {
            return [
                `${prefixCls}`,
                `${prefixCls}-${this.direction}`,
                {
                    [`${prefixCls}-${this.size}`]: !!this.size
                }
            ];
        }
    },
    props: {
        current: {
            type: Number,
            default: 0
        },
        status: {
            validator (value) {
                return oneOf(value, ['wait', 'process', 'finish', 'error']);
            },
            default: 'process'
        },
        direction: {
            validator (value) {
                return oneOf(value, ['horizontal', 'vertical']);
            },
            default: 'horizontal'
        }
    },
    data(){
        return{
            stepIndex:this.current
        }
    },
    methods:{
        updateChildProps (isInit) {
            const total = this.$children.length;
            this.$children.forEach((child, index) => {
                child.stepNumber = index + 1;

                // 只支持垂直 注释iview
                if (this.direction === 'horizontal') {
                    child.total = total;
                }

                // 如果已存在status,且在初始化时,则略过
                // todo 如果当前是error,在current改变时需要处理
                if (!(isInit && child.currentStatus)) {
                    if (index == this.stepIndex) {
                        if (this.status != 'error') {
                            child.currentStatus = 'process';
                        }
                    } else if (index < this.stepIndex) {
                        child.currentStatus = 'finish';
                    } else {
                        child.currentStatus = 'wait';
                    }
                }
                if (child.currentStatus != 'error' && index != 0) {
                    this.$children[index - 1].nextError = false;
                }
            });
        },
        updateCurrent (isInit) {
            // 防止溢出边界
            if (this.stepIndex < 0 || this.stepIndex >= this.$children.length ) {
                return;
            }
            if (isInit) {
                const current_status = this.$children[this.stepIndex].currentStatus;
                if (!current_status) {
                    this.$children[this.stepIndex].currentStatus = this.status;
                }
            } else {
                this.$children[this.stepIndex].currentStatus = this.status;
            }
        },
        updateSteps () {
            this.updateChildProps(true);
            // this.setNextError();
            this.updateCurrent(true);
        },
        changeCurrent(child){
            let index = [].indexOf.call(this.$children, child);
            this.stepIndex=index;
            this.$emit('change',this.stepIndex)
        }
    },
    mounted () {
        this.updateSteps();
        this.$on('append', this.updateSteps());
        this.$on('remove', this.updateSteps());
        //点击事件处理
        this.$on('whichChild', this.changeCurrent);
    },
    watch: {
        stepIndex () {
            this.updateChildProps();
        },
        // status () {
        //     this.updateCurrent();
        // }
    }
}
</script>
<style lang="less">
    .ivu-steps{
        // font-size: 0;
        width: 100%;
        line-height: 1.5;
    }
</style>

