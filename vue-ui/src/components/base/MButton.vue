<template>
    <button 
        class="btn" 
        :class="buttonClass" 
        @click="$emit('handleBtnClick')"
        :ref="btnRef"
    >
        <m-icon v-if="buttonWithIcon" :iconClass="iconClass"></m-icon>
        <label for="" :class="labelClass">{{ buttonTitle }}</label>
        <div class="btn-desc-pseudo" v-if="btnDesc"></div>
        <div class="btn-desc" v-if="btnDesc">
            {{ btnDesc }}
        </div>
    </button>
</template>

<script>

export default {
    name: 'MButton',
    props: {
        'buttonTitle': String,
        'buttonClass': [String, Array],
        'buttonWithIcon': Boolean,
        'iconClass': String,
        'btnRef': String,
        'btnDesc': String
    },

    methods: {
        /**
         * Focus vào button
         * @author nqtrong (15-08-2023)
         */
        focus() {
            this.$refs[this.btnRef]?.focus();
        }
    },

    setup(props) {
        const labelClass = {
            'btn__label--btn-with-icon': props.buttonWithIcon
        }

        return {
            labelClass
        }
    }
}
</script>

<style scoped>
@import url(../../css/base/button.css);
</style>