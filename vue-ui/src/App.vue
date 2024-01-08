<template>
  <div class="app-wrapper">
    <TheHeader></TheHeader>
    <div class="app-content">
      <TheMenu></TheMenu>
      <TheContent></TheContent>
    </div>
  </div>
</template>

<script>
import TheHeader from './components/layout/TheHeader.vue';
import TheMenu from './components/layout/TheMenu.vue';
import TheContent from './components/layout/TheContent.vue';

export default {
  name: 'App',
  components: {
    TheHeader,
    TheMenu,
    TheContent
  }
}
</script>

<style>
@import url(./css/main.css);
</style>
