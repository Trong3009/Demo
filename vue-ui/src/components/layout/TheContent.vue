<template>
    <div class="content">
        <router-view></router-view>
        <transition>
            <m-toast-message v-if="toastMessageShowed"
                success
                :type="toastMessageType"
                :content="toastMessageContent"
                @closeToastMessage="handleCloseToastMessage"
            ></m-toast-message>
        </transition>
        <m-dialog v-if="dialogShowed"
            dialogTitle="Dữ liệu không hợp lệ"
            :dialogDesc="dialogDesc"
            :dialogType="dialogType"
            @closeDialog="handleCloseDialog"
        ></m-dialog>
    </div>
</template>

<script>

export default {
    created() {
        this.$emitter.on('showToastMessage', this.showToastMessage);
        this.$emitter.on('showDialog', this.showDialog);
    },

    unmounted() {
        this.$emitter.off('showToastMessage');
        this.$emitter.off('showDialog')
    },

    data() {
        return {
            toastMessageType: '',
            toastMessageContent: '',
            toastMessageShowed: false,
            dialogTitle: '',
            dialogDesc: [],
            dialogType: '',
            dialogShowed: false
        }
    },

    methods: {
        /**
         * Hiện Toast Message
         * @author nqtrong (15-08-2023)
         */
        showToastMessage(type, content) {
            this.toastMessageType = type;
            this.toastMessageContent = content;
            this.toastMessageShowed = true;
            setTimeout(() => {
                this.handleCloseToastMessage();
            }, 2500)
        },
        /**
         * Đóng Toast Message
         */
        handleCloseToastMessage() {
            this.toastMessageShowed = false;
        },
        /**
         * Hiện dialog
         */
        showDialog(type, title, desc) {
            this.dialogType = type;
            this.dialogTitle = title;
            this.dialogDesc = desc;
            this.dialogShowed = true;
        },
        /**
         * Đóng Dialog
         */
        handleCloseDialog() {
            this.dialogShowed = false;
            this.$emitter.emit('focusElementError');
        }
    }
}
</script>

<style scoped>
@import url(../../css/layout/content.css);
</style>