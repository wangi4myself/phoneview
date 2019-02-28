<template>
    <div :class="wrapClasses" @click="getIndex">
        <div :class="[prefixCls + '-tail']"><i></i></div>
        <div :class="[prefixCls + '-head']">
            <div :class="[prefixCls + '-head-inner']">
                <span v-if="currentStatus != 'finish' && currentStatus != 'error'">{{ stepNumber }}</span>
                <span v-else :class="iconClasses"></span>
            </div>
        </div>
        <div :class="[prefixCls + '-main']">
            <div :class="[prefixCls + '-title']">{{ title }}</div>
            <div v-if="content" :class="[prefixCls + '-content']">{{ content }}</div>
            <slot></slot>
        </div>
    </div>
</template>
<script>

import Emitter from '@/mixins/emitter';
import { oneOf } from '@/tools/assist';

const prefixCls = 'ivu-steps';
const iconPrefixCls = 'ivu-icon';

export default {
    name: 'Step',
    mixins: [ Emitter ],
    props: {
        status: {
            validator (value) {
                return oneOf(value, ['wait', 'process', 'finish', 'error']);
            }
        },
        title: {
            type: String,
            default: ''
        },
        content: {
            type: String
        },
        // icon: {
        //     type: String
        // }
    },
    data () {
        return {
            prefixCls: prefixCls,
            stepNumber: '',
            nextError: false,
            total: 1,
            currentStatus: ''
        };
    },
    computed: {
        wrapClasses () {
            return [
                `${prefixCls}-item`,
                `${prefixCls}-status-${this.currentStatus}`,
            ];
        },
        styles () {
            return {
                width: `${1/this.total*100}%`
            };
        },
        iconClasses () {
            let icon = '';
            if (this.currentStatus == 'finish') {
                icon = 'ios-checkmark';
            } else if (this.currentStatus == 'error') {
                icon = 'ios-close';
            }
            return [
                `${prefixCls}-icon`,
                `${iconPrefixCls}`,
                {
                    [`${iconPrefixCls}-${icon}`]: icon != ''
                }
            ];
        },
    },
    methods:{
        getIndex(){
            this.dispatch('Steps', 'whichChild', this);
        }
    },
    created () {
        this.currentStatus = this.status;
    },
    mounted () {
        this.dispatch('Steps', 'append');
    },
    beforeDestroy () {
        this.dispatch('Steps', 'remove');
    }
}
</script>

<style lang="less">
 @import '../../assets/styles/components/steps.less';
</style>

    