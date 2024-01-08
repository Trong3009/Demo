<template>
    <div class="toast-message">
        <div class="toast-message__content">
            <m-icon :iconClass="iconClass"></m-icon>
            <span class="toast-message__type" :class="typeClass">{{ type }}</span>
            <span class="toast-message__desc">{{ content }}</span>
        </div>
        <div @click="$emit('closeToastMessage')">
            <m-icon iconClass="icon-close"></m-icon>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        'success': Boolean,
        'warning': Boolean,
        'error': Boolean,
        'info': Boolean,
        'type': String,
        'content': String
    },

    computed: {
        iconClass: function() {
            return {
                'success': this.success,
                'warning': this.warning,
                'error': this.error,
                'info': this.info
            }
        },
        typeClass: function () {
            return {
                'toast-message__type--success': this.success,
                'toast-message__type--warning': this.warning,
                'toast-message__type--error': this.error,
                'toast-message__type--info': this.info
            }
        }
    }
}
</script>

<style scoped>
@import url(../../css/base/toast-message.css);
</style>