<template>
  <div class="home">
    <TheProduct></TheProduct>
  </div>
</template>

<script>
// @ is an alias to /src
import TheProduct from '@/components/web/product/TheProduct.vue';
export default {
  name: "HomeView",
  components: {
    TheProduct
  },
};
</script>
<style>
.home{
  display: flex;
  flex-direction: row;
  column-gap: 56px;
}
</style>
