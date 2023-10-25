<template>
    <div class="product">
        <div v-for="(item, index) in products" :key="index" class="main-product">
            <div class="header-product">{{ item.title }}</div>
            <div class="container-product">{{ item.src }}</div>
            <div class="footer product">{{ item.price }}</div>
        </div>
    </div>
</template>

<script>
export default {
    name:'product',
    setup(){
        const products = [
            {
                title: 'giay',
                src: '',
                price: '123.123',
            }
        ];
        return {products};
    }
}
</script>

<style>

</style>