<template>
    <div class="wrapper-app">
      <TheHeader></TheHeader>
      <TheSidebar></TheSidebar>
      <TheContainer></TheContainer>
    </div>
</template>
<script>
import TheSidebar from './views/layouts/TheSidebar.vue';
import TheHeader from './views/layouts/TheHeader.vue';
import TheContainer from './views/layouts/TheContainer.vue';
export default {
    components:{
      TheSidebar, TheHeader, TheContainer,
    }
}
</script>
<style>
    @import url(./css/main.css);
</style>
