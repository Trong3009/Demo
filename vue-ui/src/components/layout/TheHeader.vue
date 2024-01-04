<template>
    <div class="header">
        <!-- icon toggle and logo app -->
        <div class="header__left">
            <m-icon iconClass="toggle"></m-icon>
            <div class="logo">
                CeGov
            </div>
        </div>
        <!-- company name and user icon, info -->
        <div class="header__right">
            <div v-for="(icon, index) in headerIcon" :key="index" class="header__icon">
                <m-icon :iconClass="icon.iconClass" :desc="icon.iconDesc"></m-icon>
            </div>
            <div class="avatar"></div>
        </div>
    </div>
</template>

<script>
export default {
    computed: {
        headerIcon() {
            const headerIcon = [
                {
                    iconClass: 'notify',
                    iconDesc: this.$resource.iconDesc.notify[this.$langCode],
                    handleOnClick() {

                    }
                },
                {
                    iconClass: 'setting--gray',
                    iconDesc: this.$resource.iconDesc.setting[this.$langCode],
                    handleOnClick() {

                    }
                },
            ];
            return headerIcon
        }
    }
}
</script>

<style scoped>
@import url(../../css/layout/header.css);
</style>