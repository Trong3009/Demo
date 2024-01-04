<template>
    <div class="text-field">
        <label v-if="label" class="text-field__title">{{ label }}<span v-if="required">*</span></label>
        <div class="text-field__body" :class="{'text-field__input--w-100': width100}">
            <input 
                class="text-field__input" 
                :class="inputClass" 
                :placeholder="placeholder" 
                :ref="inputRef"
                v-model="value"
                @input="handleInput"
                @blur="handleBlur"
            />
            <div v-if="showDeleteIcon" class="text-field-delete-icon" @click="handleDeleteInputValue">
                <m-icon iconClass="close"></m-icon>
            </div>
            <div v-if="hasIcon" :class="textFiedlIcon">
                <m-icon :iconClass="iconClass"></m-icon>
            </div>
        </div>
        <p v-if="showErrorDesc" class="text-field__desc-error">{{ errorDesc }}</p>
    </div>
</template>

<script>

export default {
    name: 'MInput',
    emits: ['update:modelValue'],
    props: {
        'inputRef': String,
        'label': String,
        'placeholder': String,
        'hasValidate': Boolean,
        'errorDesc': String,
        'hasIcon': Boolean,
        'iconClass': String,
        'iconAfter': Boolean,
        'required': Boolean,
        'width100': Boolean,
        'modelValue': String
    },

    methods: {
        /**
         * Focus vào input
         */
        focus() {
            this.$refs[this.$props.inputRef]?.focus();
        },
        /**
         * Cập nhật giá trị của input cho element Cha
         */
        handleInput() {
            this.showErrorDesc = false;
            this.$emit('update:modelValue', this.value);
        },
        /**
         * Kiểm tra khi blur ra ngoài nếu input là bắt buộc nhập
         *
         */
        handleBlur() {
            if (this.hasValidate && !this.modelValue) {
                this.showErrorDesc = true;
            } else {
                this.showErrorDesc = false;
            }
        },
        /**
         * Hiện cảnh báo
         */
        showError() {
            this.showErrorDesc = true;
        },
        /**
         * Xóa giá trị của input khi click vào nút x
         */
        handleDeleteInputValue() {
            this.value = '';
            this.focus();
        }
    },

    computed: {
        inputClass: function() {
            return {
                'text-field__input--nomal': !this.showErrorDesc,
                'text-field__input--error': this.showErrorDesc,
                'text-field__input--have-icon-after': this.iconAfter,
                'text-field__input--w-100': this.width100,
            }
        }
    },

    setup(props) {
        const textFiedlIcon = {
            'text-field__icon--after': props.iconAfter
        }
        return {
            textFiedlIcon
        }
    },

    created() {
        this.value = this.modelValue;
    },

    data() {
        return {
            value: '',
            showErrorDesc: false,
            showDeleteIcon: false
        }
    },

    watch: {
        value(newValue) {
            if (newValue) {
                this.showDeleteIcon = true;
            } else {
                this.showDeleteIcon = false;
            }
        }
    }
}
</script>

<style scoped>
@import url(../../css/base/input.css);
</style>