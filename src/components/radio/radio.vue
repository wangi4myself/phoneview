<template>
    <span class="radio-wrapper" :class="radioClasses">
            <input
                type="radio"
                :disabled="disabled"
                :checked="currentValue"
                :name="groupName"
                @change="change"
                >
       <slot>{{ label }}</slot>
    </span>
</template>
<script>
    import { findComponentUpward } from '@/tools/assist.js';
    import Emitter from '@/mixins/emitter.js';
    export default {
        name: 'Radio',
        mixins: [ Emitter ],
        props: {
            value: {
                type: [String, Number, Boolean],
                default: false
            },
            trueValue: {
                type: [String, Number, Boolean],
                default: true
            },
            falseValue: {
                type: [String, Number, Boolean],
                default: false
            },
            label: {
                type: [String, Number]
            },
            disabled: {
                type: Boolean,
                default: false
            },
            name: {
                type: String
            }
        },
        computed: {
            radioClasses () {
                return [
                    {
                        [`radio-wrapper-checked`]: this.currentValue,
                    }
                ];
            },
        },
        data () {
            return {
                currentValue: this.value,
                group: false,
                groupName: this.name,
                parent: findComponentUpward(this, 'RadioGroup'),
                focusWrapper: false,
                focusInner: false
            };
        },
        mounted () {
            if (this.parent) {
                this.group = true;
                if (this.name && this.name !== this.parent.name) {
                    if (console.warn) {
                        console.warn('[iview] Name does not match Radio Group name.');
                    }
                } else {
                    this.groupName = this.parent.name; 
                }
            }

            if (this.group) {
                this.parent.updateValue();
            } else {
                this.updateValue();
            }
        },
        methods: {
            change (event) {
                if (this.disabled) {
                    return false;
                }

                const checked = event.target.checked;
                this.currentValue = checked;

                const value = checked ? this.trueValue : this.falseValue;
                this.$emit('input', value);

                if (this.group) {
                    if (this.label !== undefined) {
                        this.parent.change({
                            value: this.label,
                            checked: this.value
                        });
                    }
                } else {
                    this.$emit('on-change', value);
                }
            },
            updateValue () {
                this.currentValue = this.value === this.trueValue;
            },
        },
        watch: {
            value (val) {
                if (val === this.trueValue || val === this.falseValue) {
                    this.updateValue();
                } else {
                    throw 'Value should be trueValue or falseValue.';
                }
            }
        }
    };
</script>
<style lang="less">
    .radio-wrapper{
        background-color: #EFEFF4;
        border-radius: 50px;
        color: #303030;
        letter-spacing: 0;
        text-align: center;
        border: 1px solid #EFEFF4;
        position: relative;
        display: inline-block;
        padding: 4px 8px;
        margin-bottom: 8px;
        input[type] {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 1;
            opacity: 0;
        }
        &-checked{
            background-color: #ffffff;
            border: 1px solid #008CD7;
            color: #008CD7;
        }
    }
</style>
