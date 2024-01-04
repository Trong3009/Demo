    <template>
    <div class="sidebar">
        <div class="nav-wrapper">
            <div v-for="(item, index) in navItems" :key="index" class="nav-main">
                <hr v-if="item.hasBorderTop"/>
                <router-link :to="item.link" class="nav-item" :class="{'nav-active': item.active}">
                    <div class="nav-content">
                        <m-icon :iconClass="item.iconClass"></m-icon>
                        <div class="nav__text">{{ item.title }}</div>
                    </div>
                    <m-icon v-if="item.children" iconClass="icon-arrow-right"></m-icon>
                </router-link>
            </div>
        </div>   
        <div class="nav-collapse">
            <div class="nav-content">
                <m-icon iconClass="icon-collapse"></m-icon>
                <div class="nav__text">Thu gọn</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        setup() {
            const navItems = [
                {
                    title: 'Tổng quan',
                    iconClass: 'dashboard',
                    link: '/',
                    active: false
                },
                {
                    title: 'Thi đua',
                    iconClass: 'movement',
                    children: [{
                        title: 'Quản lý phong trào',
                        link: '/emula'
                    },
                    {
                        title: 'Đăng ký thi đua',
                        link: '/emula'
                    }],
                    link: '/emula',
                    active: false
                },
                {
                    title: 'Danh mục',
                    iconClass: 'category',
                    children: [],
                    link: '/emulation',
                    active: true,
                    hasBorderTop: true
                },
            ];

            return {
                navItems
            };
        }
    }
</script>

<style scoped>
@import url(../../css/layout/menu.css);
</style>