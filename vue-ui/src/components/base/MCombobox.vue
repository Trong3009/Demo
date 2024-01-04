<template>
    <div>
        <label v-if="label" class="combobox__title" :class="{'combobox__title--gray': titleGray}">
            {{ label }}
            <span v-if="required">*</span>
        </label>
        <div class="combobox__body">
            <div 
                class="combobox__input" 
                :class="{'combobox__input--active': showCombobox, 'combobox__input--small': comboboxSmall}" 
                @click="showCombobox=!showCombobox"
                :ref="comboboxRef"
                tabindex="0"
            >
                <span>{{ selectedTitle }}</span>
                <m-icon iconClass="icon-down"></m-icon>
            </div>
            <div 
                v-show="showCombobox" 
                class="combobox__result" 
                :class="{'combobox__result-in-top': showInTop, 
                            'combobox__result-in-bottom': !showInTop, 
                            'combobox__result--small': comboboxSmall
                        }"
            >
                <div 
                    v-for="(option, index) in options" 
                    class="combobox__item"
                    :key="index" 
                    :value="option.value" 
                    :class="{'combobox__item--selected': option.value == selectedValue}"
                    @click="handleSelect(option.value)"
                >
                    {{ option.title }}
                    <m-icon v-if="option.value == selectedValue" iconClass="tick"></m-icon>
                </div>
            </div>
        </div>
        <p v-if="error" class="combobox__desc-error">{{ errorDesc }}</p>
    </div>
</template>

<script>
import { ref } from 'vue';

export default {
    name: 'MCombobox',
    props: {
        'label': String,
        'error': Boolean,
        'errorDesc': String,
        'required': Boolean,
        'options': Array,
        'showInTop': Boolean,
        'comboboxSmall': Boolean,
        'comboboxRef': String,
        'modelValue': Number,
        'titleGray': Boolean
    },
    emits: ['update:modelValue'],

    data() {
        return {
            showCombobox: ref(false),
            selectedTitle: this.options.find(option => this.modelValue == option.value)?.title,
            selectedValue: this.modelValue
        }
    },

    methods: {
        /**
         * Thay đổi giá trị khi lựa chọn
         * @author nqtrong (15-08-2023)
         * 
         */
        
        handleSelect(value) {
            this.selectedValue = value;
            this.selectedTitle = this.options.find(option => value == option.value)?.title;
            this.$emit('update:modelValue', value);
            this.showCombobox = false;
        }
    }
}
</script>

<style scoped>
@import url(../../css/base/combobox.css);
</style>