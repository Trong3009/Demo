<template>
    <div class="home-Dashboard">
        <div class="header">
            <div class="header-right">
                <m-input></m-input>
            </div>
            <div class="header-left">
                <div v-for="(icon, index) in headerIcon" :key="index" class="header__icon">
                    <m-icon :iconClass="icon.iconClass" :desc="icon.iconDesc"></m-icon>
                </div>
                <div class="avatar"></div>
            </div>
        </div>
        <div class="container">
            div.container-
        </div>
    </div>
</template>

<script>
export default{
    name: "Dashboard",
    computed: {
        headerIcon() {
            const headerIcon = [
                {
                    iconClass: 'notify',
                    iconDesc: this.$resource.iconDesc.notify[this.$langCodeENG],
                    handleOnClick() {

                    }
                },
                {
                    iconClass: 'mail',
                    iconDesc: this.$resource.iconDesc.mail[this.$langCode],
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
@import url(../../css/home/dashboard.css);
</style>