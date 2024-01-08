<template>
    <div class="dialog-wrapper">
        <div class="dialog dialog-center">
            <div class="dialog__header">
                <h3 class="dialog__title">{{ dialogTitle }}</h3>
                <m-icon iconClass="close" @click="$emit('closeDialog')"></m-icon>
            </div>
            <div class="dialog__body">
                <m-icon :iconClass="iconClass"></m-icon>
                <div>
                    <li v-for="(item, index) in dialogDesc" :key="index" :class="{'list-style-none': dialogDesc.length < 2}">{{ item }}</li>
                </div>
            </div>
            <div class="dialog__footer">
                <m-button buttonTitle="Xác nhận" buttonClass="btn--primary" @click="$emit('closeDialog')"></m-button>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    props: {
        'dialogTitle': String,
        'dialogDesc': Array,
        'dialogType': String
    },

    computed: {
        iconClass() {
            return {
                'warning': this.dialogType == 'warning',
                'error': this.dialogType == 'error',
                'success': this.dialogType == 'success',
                'info': this.dialogType == 'info'
            }
        }
    }
}
</script>

<style>
@import url(../../css/base/dialog.css);
</style>