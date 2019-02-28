<template>
    <field
        :type="type"
        :value="currentValue"
        @input="handleInput"
        @blur="handleBlur"
        :label=label
        :error-message=message
        :required=required
        :readonly=readonly
        :autosize=autosize
        :placeholder=placeholder
    />
</template>
<script>
    import Emitter from '@/mixins/emitter.js';
    import { Field } from 'vant';
    export default {
        name: 'iInput',
        mixins: [ Emitter ],
        components:{
            Field
        },
        props: {
            value: {
                type: [String,Number],
                default: ''
            },
            type:{
                type: String,
                default: 'text'
            },
            label: {
                type: String,
                default: ''
            },
            readonly:{
                type: Boolean,
                default: false
            },
            autosize:{
                type: Boolean,
                default: false
            },
            placeholder:{
                type: String,
                default: ''
            }
        },
        data () {
            return {
                currentValue: this.value,
                message:'',
                required:false,
            }
        },
        watch: {
            value (val) {
                this.currentValue = val;
            }
        },
        methods: {
            handleInput (event) {
                const value = event;
                this.currentValue = value;
                this.$emit('input', value);
                this.dispatch('iFormItem', 'on-form-change', value);
            },
            handleBlur () {
                this.dispatch('iInput', 'on-form-blur', this.currentValue);
                this.$emit('blur', this.currentValue);
            },
            getMessage (message){
                this.message=message
            },
            isRequired (required){
                this.required=required
            }
        },
        mounted(){
            this.$on('message', this.getMessage);
            this.$on('isRequired', this.isRequired);
        }
    }
</script>