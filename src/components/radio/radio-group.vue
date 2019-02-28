<template>
    <div :name="name">
        <slot></slot>
        <div v-if="!!message" class="i-form-item-message">{{ message }}</div>
    </div>
</template>

<script>
import { findComponentsDownward } from '@/tools/assist.js';
import Emitter from '@/mixins/emitter.js';
let seed = 0;
const now = Date.now();
const getUuid = () => `ivuRadioGroup_${now}_${seed++}`;
export default {
    name: 'RadioGroup',
    mixins: [ Emitter ],
    props: {
        value: {
            type: [String, Number],
            default: ''
        },
        name: {
            type: String,
            default: getUuid
        }
    },
    data () {
        return {
            currentValue: this.value,
            childrens: [],
            message:'',
        };
    },
    mounted () {
        this.updateValue();
        this.$on('message', this.getMessage);
    },
    methods: {
        updateValue () {
            this.childrens = findComponentsDownward(this, 'Radio');
            if (this.childrens) {
                this.childrens.forEach(child => {
                    child.currentValue = this.currentValue === child.label;
                    child.group = true;
                });
            }
        },
        change (data) {
            this.currentValue = data.value;
            this.updateValue();
            this.$emit('input', data.value);
            this.$emit('on-change', data.value);
        },
        getMessage(message){
            this.message=message
        }
    },
    watch: {
        value () {
            if(this.currentValue !== this.value){
                this.currentValue = this.value;
                this.$nextTick(()=>{
                    this.updateValue();
                });
            }
        }
    }
}
</script>
